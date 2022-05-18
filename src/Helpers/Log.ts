import * as chalk from 'chalk';

const logInfo = (message: string) => {
  console.log(chalk.reset(message));
};
const logSuccess = (message: string) => {
  console.log(chalk.green(message));
};
const logWarn = (message: string) => {
  console.log(chalk.yellow(message));
};

const logError = (message: string) => {
  console.log(chalk.red(message));
};

const logTitle = (message: string) => {
  console.log(chalk.white.bgBlack(message));
};

export { logInfo, logSuccess, logError, logWarn, logTitle };
