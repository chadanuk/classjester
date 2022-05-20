"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk = require("chalk");
class Logger {
    constructor() {
        this.infoLogs = [];
        this.successLogs = [];
        this.errorLogs = [];
        this.warnLogs = [];
        this.titleLogs = [];
        this.plainLogs = [];
    }
    logInfo(message) {
        console.log(chalk.blue(message));
    }
    logSuccess(message) {
        console.log(chalk.green(message));
    }
    logWarn(message) {
        console.log(chalk.yellow(message));
    }
    logError(message) {
        console.log(chalk.red(message));
    }
    logTitle(message) {
        console.log(chalk.white.bgBlack(message));
    }
    logPlain(message) {
        console.log(message);
    }
}
exports.Logger = Logger;
