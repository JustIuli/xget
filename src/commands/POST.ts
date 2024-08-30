import chalk from 'chalk';
import http from 'http';
import https from 'https';
import url from 'url';

export default function POST(addr: string, data: object) {
    const parsedUrl = url.parse(addr);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;

    const options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: parsedUrl.path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(data)),
        },
    };

    const req = protocol.request(options, (response) => {
        let responseData = '';
        response.on('data', (chunk) => {
            responseData += chunk;
        });
        response.on('end', () => {
            console.log(chalk.cyan(`[${chalk.bold('Posting')}] ${addr}`));
            console.log(responseData);
        });
    });

    req.on('error', (err) => {
        console.error(chalk.red(`Error: ${err.message}`));
    });

    req.write(JSON.stringify(data));
    req.end();
}
