"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestCase_1 = require("../Core/TestCase");
class TestCaseTest extends TestCase_1.TestCase {
    constructor() {
        super();
    }
    testSetUpExists() {
        const testCase = new TestCase_1.TestCase();
        this.assertType('function', testCase['setUp']);
    }
    testTearDownExists() {
        const testCase = new TestCase_1.TestCase();
        this.assertType('function', testCase['tearDown']);
    }
}
exports.default = TestCaseTest;
