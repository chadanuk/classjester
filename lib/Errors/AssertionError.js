"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssertionError = void 0;
class AssertionError extends Error {
    constructor(message) {
        var _a;
        super(message);
        this.errorDetails = this.stack === undefined ? '' : (_a = this.stack) === null || _a === void 0 ? void 0 : _a.split('\n')[2];
    }
}
exports.AssertionError = AssertionError;
