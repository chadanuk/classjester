import * as chalk from 'chalk';
import { LoggerInterface } from './LoggerInterface';

class Logger implements LoggerInterface {
  public infoLogs: string[] = [];
  public successLogs: string[] = [];
  public errorLogs: string[] = [];
  public warnLogs: string[] = [];
  public titleLogs: string[] = [];
  public plainLogs: string[] = [];

  logInfo(message: string) {
    console.log(chalk.blue(message));
  }
  logSuccess(message: string) {
    console.log(chalk.green(message));
  }
  logWarn(message: string) {
    console.log(chalk.yellow(message));
  }

  logError(message: string) {
    console.log(chalk.red(message));
  }

  logTitle(message: string) {
    console.log(chalk.white.bgBlack(message));
  }

  logPlain(message: string) {
    console.log(message);
  }
}

export { Logger };
