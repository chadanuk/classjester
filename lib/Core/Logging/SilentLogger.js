"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SilentLogger = void 0;
class SilentLogger {
    constructor() {
        this.infoLogs = [];
        this.successLogs = [];
        this.errorLogs = [];
        this.warnLogs = [];
        this.titleLogs = [];
        this.plainLogs = [];
    }
    logInfo(message) {
        this.infoLogs.push(message);
    }
    logSuccess(message) {
        this.successLogs.push(message);
    }
    logWarn(message) {
        this.successLogs.push(message);
    }
    logError(message) {
        this.errorLogs.push(message);
    }
    logTitle(message) {
        this.titleLogs.push(message);
    }
    logPlain(message) {
        this.plainLogs.push(message);
    }
}
exports.SilentLogger = SilentLogger;
