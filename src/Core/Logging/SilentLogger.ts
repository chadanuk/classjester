import { LoggerInterface } from './LoggerInterface';

class SilentLogger implements LoggerInterface {
  public infoLogs: string[] = [];
  public successLogs: string[] = [];
  public errorLogs: string[] = [];
  public warnLogs: string[] = [];
  public titleLogs: string[] = [];
  public plainLogs: string[] = [];

  logInfo(message: string) {
    this.infoLogs.push(message);
  }

  logSuccess(message: string) {
    this.successLogs.push(message);
  }

  logWarn(message: string) {
    this.successLogs.push(message);
  }

  logError(message: string) {
    this.errorLogs.push(message);
  }

  logTitle(message: string) {
    this.titleLogs.push(message);
  }

  logPlain(message: string) {
    this.plainLogs.push(message);
  }
}

export { SilentLogger };
