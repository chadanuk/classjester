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
const TestRunner_1 = require("../Core/TestRunner");
class TestCaseTest extends TestCase_1.TestCase {
    constructor() {
        super();
    }
    testHasRunFunction() {
        const testRunner = new TestRunner_1.TestRunner();
        this.assertType('function', testRunner['run']);
    }
    testErrorsWithNonValidFolder() {
        return __awaiter(this, void 0, void 0, function* () {
            const testRunner = new TestRunner_1.TestRunner();
            try {
                yield testRunner.run('some-folder');
            }
            catch (error) {
                this.assertEquals(`ENOENT: no such file or directory, scandir 'some-folder'`, error.message);
            }
        });
    }
}
exports.default = TestCaseTest;
