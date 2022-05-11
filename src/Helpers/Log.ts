const logInfo = (message: string) => {
  console.log(`\x1b[47m${message}\x1b[0m`);
};
const logSuccess = (message: string) => {
  console.log(`\x1b[32m${message}\x1b[0m`);
};
const logWarn = (message: string) => {
  console.log(`\x1b[34m${message}\x1b[0m`);
};

const logError = (message: string) => {
  console.log(`\x1b[31m${message}\x1b[0m`);
};

export { logInfo, logSuccess, logError, logWarn };
