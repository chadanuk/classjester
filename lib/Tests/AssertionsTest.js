"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const TestCase_1 = require("../Core/TestCase");
const AssertionError_1 = require("../Errors/AssertionError");
class AssertionsTest extends TestCase_1.TestCase {
    testCanCheckIfTrueEqualsTrue() {
        return __awaiter(this, void 0, void 0, function* () {
            this.assertTrue(true);
            this.assertEquals(1, this.testAssertionCount);
        });
    }
    testAssertionErrorThrownIfExpectedValueIsNotTrue() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.assertTrue(false);
            }
            catch (error) {
                this.assertEquals(1, this.testAssertionCount);
                this.assertTrue(error instanceof AssertionError_1.AssertionError);
                this.assertEquals('false is not equal to expected value: true', error.message);
                this.assertEquals(`\u001b[32m-Expected\u001b[39m\u001b[31m+Received\u001b[39m\u001b[32m-true\u001b[39m\u001b[31m+false\u001b[39m`.replace(/\s/g, ''), error.diff.replace(/\s/g, ''));
            }
        });
    }
    testCanCheckIfFalseEqualsFalse() {
        return __awaiter(this, void 0, void 0, function* () {
            this.assertFalse(false);
            this.assertEquals(1, this.testAssertionCount);
        });
    }
    testAssertionErrorThrownIfExpectedValueIsNotFalse() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.assertFalse(true);
            }
            catch (error) {
                this.assertEquals(1, this.testAssertionCount);
                this.assertTrue(error instanceof AssertionError_1.AssertionError);
                this.assertEquals('true is not equal to expected value: false', error.message);
            }
        });
    }
    testCanThrowCustomErrorIfTrueNotFalse() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.assertFalse(true, 'Value should be no');
            }
            catch (error) {
                this.assertEquals(1, this.testAssertionCount);
                this.assertTrue(error instanceof AssertionError_1.AssertionError);
                this.assertEquals('Value should be no', error.message);
            }
        });
    }
    testAssertionErrorThrownIfExpectedValueIsNotEqual() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.assertEquals(true, false);
            }
            catch (error) {
                this.assertEquals(1, this.testAssertionCount);
                this.assertTrue(error instanceof AssertionError_1.AssertionError);
                this.assertEquals('false is not equal to expected value: true', error.message);
            }
        });
    }
    testTypeOfStringChecksTypeCorrectly() {
        try {
            this.assertType('string', 'some string');
            this.assertEquals(1, this.testAssertionCount);
        }
        catch (error) {
            this.failTest('String check fails');
        }
    }
    testTypeOfObjectChecksTypeCorrectly() {
        try {
            this.assertType('object', 'some string');
        }
        catch (error) {
            this.assertEquals(1, this.testAssertionCount);
            this.assertTrue(error instanceof AssertionError_1.AssertionError);
            this.assertEquals('some string is not of type object', error.message);
        }
    }
    testTypeOfClassChecksTypeCorrectly() {
        class BClass {
        }
        const b = new BClass();
        this.assertType(BClass, b);
        this.assertEquals(1, this.testAssertionCount);
    }
    testCanAssertNotEquals() {
        try {
            this.assertNotEquals(true, false);
            this.assertEquals(1, this.testAssertionCount);
        }
        catch (error) {
            this.failTest('NotEquals assertion fails');
        }
    }
    testAssertNotEqualsAndThrowsErrorIfTrue() {
        try {
            this.assertNotEquals(true, true);
        }
        catch (error) {
            this.assertEquals(1, this.testAssertionCount);
            this.assertTrue(error instanceof AssertionError_1.AssertionError);
            this.assertEquals('true is equal to: true and it should not be', error.message);
        }
    }
    testCanAssertCount() {
        try {
            this.assertCount(2, ['a', 'b']);
            this.assertCount(2, { id: 'a', value: 'b' });
            this.assertEquals(2, this.testAssertionCount);
        }
        catch (error) {
            this.failTest('Count assertion fails');
        }
    }
    testCanAssertCountAndThrowError() {
        try {
            this.assertCount(3, ['a', 'b']);
        }
        catch (error) {
            this.assertEquals(1, this.testAssertionCount);
            this.assertTrue(error instanceof AssertionError_1.AssertionError);
            this.assertEquals('Count of {"value":["a","b"]} (2) is not equal to expected value: 3', error.message);
        }
    }
    testCanAssertNotUndefined() {
        try {
            this.assertNotUndefined('something');
            this.assertEquals(1, this.testAssertionCount);
        }
        catch (error) {
            this.failTest('Undefined assertion fails');
        }
    }
    testCanAssertNotUndefinedAndThrowError() {
        try {
            this.assertNotUndefined(undefined);
        }
        catch (error) {
            this.assertEquals(1, this.testAssertionCount);
            this.assertTrue(error instanceof AssertionError_1.AssertionError);
            this.assertEquals('Value is undefined', error.message);
        }
    }
    testCanFailTestManually() {
        try {
            this.failTest('Failed this one');
        }
        catch (error) {
            this.assertEquals(1, this.testAssertionCount);
            this.assertTrue(error instanceof AssertionError_1.AssertionError);
            this.assertEquals('Failed this one', error.message);
        }
    }
}
exports.default = AssertionsTest;
