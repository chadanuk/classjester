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
        });
    }
    testAssertionErrorThrownIfExpectedValueIsNotTrue() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.assertTrue(false);
            }
            catch (error) {
                this.assertTrue(error instanceof AssertionError_1.AssertionError);
                this.assertEquals('false is not equal to expected value: true', error.message);
                this.assertEquals(`\u001b[32m-Expected\u001b[39m\u001b[31m+Received\u001b[39m\u001b[32m-true\u001b[39m\u001b[31m+false\u001b[39m`.replace(/\s/g, ''), error.diff.replace(/\s/g, ''));
            }
        });
    }
    testAssertionErrorThrownIfExpectedValueIsNotEqual() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.assertEquals(true, false);
            }
            catch (error) {
                this.assertTrue(error instanceof AssertionError_1.AssertionError);
                this.assertEquals('false is not equal to expected value: true', error.message);
            }
        });
    }
}
exports.default = AssertionsTest;
