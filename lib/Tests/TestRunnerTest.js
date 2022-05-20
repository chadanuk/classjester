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
const rewiremock_1 = require("rewiremock");
const TestRunner_1 = require("../Core/TestRunner");
const mock = require("mock-fs");
class TestRunnerTest extends TestCase_1.TestCase {
    constructor() {
        super();
        this.testRunner = new TestRunner_1.TestRunner();
        this.testRunner.putInSilentMode();
    }
    testHasRunFunction() {
        this.assertType('function', this.testRunner['run']);
    }
    testErrorsWithNonValidFolder() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.testRunner.run('some-folder');
            }
            catch (error) {
                this.assertEquals(`ENOENT: no such file or directory, scandir 'some-folder'`, error.message);
            }
        });
    }
    testRunFunction() {
        return __awaiter(this, void 0, void 0, function* () {
            const thisTestCase = this;
            (0, rewiremock_1.default)(`${process.cwd()}/mockedTests/SomeFileTest.js`).with((module.exports = {
                default: class SomeFileTest extends TestCase_1.TestCase {
                    testFakeTest() {
                        this.assertTrue(true);
                        thisTestCase.assertTrue(true);
                    }
                },
            }));
            (0, rewiremock_1.default)(`${process.cwd()}/mockedTests/sub-dir/SomeOtherFileTest.js`).with((module.exports = {
                default: class SomeOtherFileTest extends TestCase_1.TestCase {
                    testOtherFakeTest() {
                        this.assertTrue(false);
                        thisTestCase.assertTrue(true);
                    }
                },
            }));
            rewiremock_1.default.enable();
            mock({
                mockedTests: {
                    'SomeFileTest.js': 'export new Class {}',
                    'sub-dir': {
                        'SomeOtherFileTest.js': 'export new Class {}',
                        'SomeOtherFileNotToCall.js': 'export new Class {}',
                    },
                },
            });
            try {
                yield this.testRunner.run('mockedTests');
                this.assertEquals(2, this.testRunner.testsRun);
            }
            catch (error) {
                this.failTest("TestRunner doesn't run tests correctly");
            }
            finally {
                // after a test runs
                mock.restore();
                rewiremock_1.default.disable();
            }
        });
    }
    testNoAssertionsFunction() {
        return __awaiter(this, void 0, void 0, function* () {
            const thisTestCase = this;
            (0, rewiremock_1.default)(`${process.cwd()}/mockedTests/NoAssertionsTest.js`).with((module.exports = {
                default: class NoAssertionsTest extends TestCase_1.TestCase {
                    noAssertionsTest() {
                        thisTestCase.assertTrue(true);
                    }
                },
            }));
            rewiremock_1.default.enable();
            mock({
                mockedTests: {
                    'NoAssertionsTest.js': 'export new Class {}',
                },
            });
            try {
                yield this.testRunner.run('mockedTests');
            }
            catch (error) {
                this.assertEquals(1, this.testRunner.testsRun);
                this.assertEquals(0, this.testRunner.totalAssertions);
            }
            finally {
                // after a test runs
                mock.restore();
                rewiremock_1.default.disable();
            }
        });
    }
}
exports.default = TestRunnerTest;
