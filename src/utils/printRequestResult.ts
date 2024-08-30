import chalk from "chalk";

const printRequestResult = (params: {
    reqType:string,
    data?:any,
    addr:string,
    timeSpent:number,
}) => {
    const {data, reqType, addr, timeSpent} = params;

    console.log(chalk.cyan(`[${chalk.bold('Fetching')}] ${addr}`));
    console.log(chalk.greenBright(data));

    if(reqType === 'GET') {
        console.log(chalk.yellow(`[${chalk.bold('Fetching Done')}] Time spent: ${timeSpent}ms`));
    }

}

export default printRequestResult;