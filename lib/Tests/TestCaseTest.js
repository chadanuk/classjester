"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetFiles_1 = require("../Core/GetFiles");
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
    testHasFileGetter() {
        const testCase = new TestCase_1.TestCase();
        this.assertType(GetFiles_1.GetFiles, testCase['fileGetter']);
        this.assertEquals({ id: 1, name: 'test' }, { id: 2, name: 'test' });
    }
}
exports.default = TestCaseTest;
