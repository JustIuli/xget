import * as url from 'url';
import * as http from 'http';
import * as https from 'https';
import chalk from 'chalk';
import downloadFile from "@/utils/downloadFile";
import getResponseHeaders from "@/utils/getResponseHeaders";
import isFileTextOrJSON from "@/utils/isFileTextOrJSON";
import printRequestResult from "@/utils/printRequestResult";

export default function GET(addr: string) {
    const parsedUrl = url.parse(addr);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;

    const startTime = Date.now();  // Start timing the request

    protocol.get(addr, (response) => {
        const {contentType,contentDisposition} = getResponseHeaders(response)

        const isFile = isFileTextOrJSON(contentType);

        if (isFile) {
                downloadFile({
                    response,
                    contentType,
                    contentDisposition,
                    parsedUrl,
                    addr,
                    startTime
                })
        } else {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {

                const endTime = Date.now();
                const timeSpent = endTime - startTime;

                printRequestResult({
                    reqType:'GET',
                    addr:addr,
                    timeSpent:timeSpent,
                    data:data
                })

            });
        }
    }).on('error', (err) => {
        console.error(chalk.red(`Error: ${err.message}`));
    });
}
