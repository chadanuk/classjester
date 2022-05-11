"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assertions = void 0;
const AssertionError_1 = require("../Errors/AssertionError");
class Assertions {
    constructor() {
        this.testAssertionCount = 0;
    }
    throwError(message, value = null, expected = null) {
        let messageValue = value === undefined ? '[[value]]' : JSON.stringify(value);
        let messageExpected = expected === undefined ? '[[expected]]' : JSON.stringify(expected);
        throw new AssertionError_1.AssertionError(message.replace(/{{value}}/g, messageValue).replace(/{{expected}}/, messageExpected));
    }
    assertTrue(value, errorMessage = null) {
        if (this.assertEquals(true, value)) {
            return true;
        }
        throw new AssertionError_1.AssertionError(`${value.toString()} is not equal to true`);
    }
    assertEquals(expected, value) {
        this.testAssertionCount += 1;
        if (JSON.stringify(value) === JSON.stringify(expected)) {
            return true;
        }
        this.throwError(`${JSON.stringify(value)} is not equal to ${JSON.stringify(expected)}`);
    }
    assertType(expected, value) {
        this.testAssertionCount += 1;
        if (typeof expected === 'string' && typeof value === expected) {
            return true;
        }
        if (value instanceof expected) {
            return true;
        }
        this.throwError(`${value} is not of type ${expected}`);
    }
    assertNotEquals(expected, value, message = null) {
        if (!this.assertEquals(expected, value)) {
            return true;
        }
        this.throwError(`${value.toString()} is not equal to ${expected.toString()}`);
    }
    assertNotUndefined(value) {
        try {
            return this.assertNotEquals(undefined, value);
        }
        catch (error) {
            this.throwError('Value is undefined');
        }
    }
    assertCount(expected, value) {
        let countableValue = value;
        if (typeof value === 'object') {
            countableValue = Object.keys(value);
        }
        if (expected === countableValue.length) {
            return true;
        }
        this.throwError(`Count of ${JSON.stringify({ value })} (${countableValue.length}) is not equal to ${expected.toString()}`);
    }
    resetTestAssertionCount() {
        this.testAssertionCount = 0;
    }
}
exports.Assertions = Assertions;
