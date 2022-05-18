"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssertionError = void 0;
const jest_diff_1 = require("jest-diff");
class AssertionError extends Error {
    constructor(message, expected, value) {
        var _a;
        super(message);
        this.expected = expected;
        this.value = value;
        this.errorDetails = this.stack === undefined ? '' : (_a = this.stack) === null || _a === void 0 ? void 0 : _a.split('\n').splice(1, 3).join('\n');
        this.diff = (0, jest_diff_1.diff)(this.expected, this.value);
    }
}
exports.AssertionError = AssertionError;
