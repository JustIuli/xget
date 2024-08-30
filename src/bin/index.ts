#!/usr/bin/env node

import 'module-alias/register';

import arg from 'arg';
import chalk from 'chalk';
import POST from '@/commands/POST';
import GET from '@/commands/GET';
import fs from 'fs';

const args = arg({
    '--post': Boolean,
    '--get': Boolean,
    '--addr': String,
    '-f': String,
    '--help': Boolean,
});

function usage() {
    console.log(`${chalk.whiteBright('tool [CMD]')}
  ${chalk.greenBright('--get')}    Performs a GET request | If the response data is not json or text , it will download the file
  ${chalk.greenBright('--post')}   Performs a POST request
  ${chalk.greenBright('--addr')}   Specifies the address for the request
  ${chalk.greenBright('-f')}       Specifies a JSON file to use with POST requests
  ${chalk.greenBright('--help')}   Shows help information`);
}

if (args['--help']) {
    usage();
    process.exit(0);
}

try {
    const addr = args['--addr'];
    if (!addr) {
        throw new Error('Address is required. Use --addr to specify the address.');
    }

    if (args['--post']) {
        let data = {};

        if (args['-f']) {
            const filePath = args['-f'];
            try {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                data = JSON.parse(fileContent);
            } catch (err:any) {
                throw new Error(`Error reading file: ${err.message}`);
            }
        }

        POST(addr, data);
    } else if (args['--get']) {
        GET(addr);
    } else {
        throw new Error('Please specify either --get or --post.');
    }
} catch (e:any) {
    console.log(chalk.yellow(e.message));
    console.log();
    usage();
}
