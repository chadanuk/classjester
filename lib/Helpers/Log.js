"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logTitle = exports.logWarn = exports.logError = exports.logSuccess = exports.logInfo = void 0;
const chalk = require("chalk");
const logInfo = (message) => {
    console.log(chalk.reset(message));
};
exports.logInfo = logInfo;
const logSuccess = (message) => {
    console.log(chalk.green(message));
};
exports.logSuccess = logSuccess;
const logWarn = (message) => {
    console.log(chalk.yellow(message));
};
exports.logWarn = logWarn;
const logError = (message) => {
    console.log(chalk.red(message));
};
exports.logError = logError;
const logTitle = (message) => {
    console.log(chalk.white.bgBlack(message));
};
exports.logTitle = logTitle;
