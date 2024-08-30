import getFileName from "@/utils/getFileName";
import chalk from "chalk";
import path from "path";
import getFileExtension from "@/utils/getFileExtension";
import fs from "fs";
import * as cliProgress from "cli-progress";
import http from "http";
import url from "url";


const downloadFile = (params: {
    response: http.IncomingMessage;
    contentType: string;
    contentDisposition: string;
    parsedUrl: url.UrlWithStringQuery;
    addr: string;
    startTime: number;
}) => {
    const { response, contentType, contentDisposition, parsedUrl, addr, startTime } = params;

    let fileName = getFileName(contentDisposition, parsedUrl.pathname || '', contentType);
    console.log(chalk.cyan(`[${chalk.bold('File found')}] ${addr}`));

    // Ensure fileName has a proper extension
    if (!path.extname(fileName)) {
        const extension = getFileExtension(contentType);
        fileName += extension;
    }

    // Create a write stream for the file
    const file = fs.createWriteStream(fileName);

    const progressBar = new cliProgress.SingleBar({
        format: `Downloading [{bar}] {percentage}% | {value}/{total} MB | {eta_formatted}`,
        hideCursor: true
    }, cliProgress.Presets.shades_classic);

    const totalLength = parseInt(response.headers['content-length'] || '0', 10);
    progressBar.start(totalLength / 1024 / 1024, 0);

    let downloaded = 0;


    response.on('data', (chunk) => {
        const chunkInKb = chunk.length / 1024
        downloaded += chunkInKb / 1024
        file.write(chunk);
        progressBar.update(downloaded);
    });

    response.on('end', () => {
        file.end();
        progressBar.stop();
        const elapsedTime = Date.now() - startTime;
        console.log(chalk.green(`[Downloading Done] File saved as ${fileName} | Time spent: ${elapsedTime}ms`));
    });

    response.on('error', (err) => {
        file.end();
        progressBar.stop();
        fs.unlinkSync(fileName);
        console.error(chalk.red(`Download Error: ${err.message}`));
    });

};


export default downloadFile;