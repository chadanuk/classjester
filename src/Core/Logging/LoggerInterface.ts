interface LoggerInterface {
  infoLogs: string[];
  successLogs: string[];
  errorLogs: string[];
  warnLogs: string[];
  titleLogs: string[];
  plainLogs: string[];

  logSuccess(message: string): void;
  logInfo(message: string): void;
  logWarn(message: string): void;
  logError(message: string): void;
  logTitle(message: string): void;
  logPlain(message: string): void;
}

export { LoggerInterface };
