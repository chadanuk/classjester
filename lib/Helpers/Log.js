"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logWarn = exports.logError = exports.logSuccess = exports.logInfo = void 0;
const logInfo = (message) => {
    console.log(`\x1b[47m${message}\x1b[0m`);
};
exports.logInfo = logInfo;
const logSuccess = (message) => {
    console.log(`\x1b[32m${message}\x1b[0m`);
};
exports.logSuccess = logSuccess;
const logWarn = (message) => {
    console.log(`\x1b[34m${message}\x1b[0m`);
};
exports.logWarn = logWarn;
const logError = (message) => {
    console.log(`\x1b[31m${message}\x1b[0m`);
};
exports.logError = logError;
