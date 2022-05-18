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
exports.TestRunner = void 0;
const AssertionError_1 = require("../Errors/AssertionError");
const getClassMethods_1 = require("../Helpers/getClassMethods");
const Log_1 = require("../Helpers/Log");
const GetFiles_1 = require("./GetFiles");
const emoji = require("node-emoji");
class TestRunner {
    constructor() {
        this.testFilesCount = 0;
        this.tests = 0;
        this.testsRun = 0;
        this.failedTests = 0;
        this.fileGetter = new GetFiles_1.GetFiles();
    }
    checkForNoAssertions(testingClass) {
        if (testingClass.testAssertionCount === 0) {
            (0, Log_1.logWarn)('No assertions made in this test.');
        }
        return testingClass.testAssertionCount > 0;
    }
    shouldCallMethod(testingClass, methodName) {
        return testingClass[methodName] instanceof Function && methodName.includes('test');
    }
    successOrNoAssertions(testingClass) {
        if (this.checkForNoAssertions(testingClass)) {
            (0, Log_1.logSuccess)(`${emoji.get(':white_check_mark:')} Hooray, test passed ${testingClass.testAssertionCount} assertions`);
        }
    }
    callTestMethod(testingClass, key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this.tests += 1;
                yield testingClass.setUp();
                try {
                    (0, Log_1.logInfo)(`Test: ${key}`);
                    yield testingClass[key]();
                    this.successOrNoAssertions(testingClass);
                }
                catch (error) {
                    this.failedTests += 1;
                    if (error.constructor.name === AssertionError_1.AssertionError.name) {
                        (0, Log_1.logError)('Test failed');
                        (0, Log_1.logError)(error.message);
                        error.outputDiff();
                        (0, Log_1.logInfo)(error.errorDetails);
                    }
                    else {
                        throw error;
                    }
                }
                finally {
                    this.testsRun += 1;
                    yield testingClass.tearDown();
                    testingClass.resetTestAssertionCount();
                    resolve(true);
                }
            }));
        });
    }
    importTestClass(file) {
        return __awaiter(this, void 0, void 0, function* () {
            let filePath = '';
            if (process.env.IS_SELF) {
                filePath = `${process.cwd()}/${file.replace('./lib/Tests/', 'lib/Tests/')}`.replace(/\/\//g, '/');
            }
            else {
                filePath = `${process.cwd()}/${file}`.replace('./', '').replace(/\/\//g, '/');
            }
            return new (yield Promise.resolve().then(() => require(filePath))).default();
        });
    }
    workThroughTestFiles(files) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const file of files) {
                const fileArray = file.split('/');
                if (!fileArray[fileArray.length - 1].includes('Test')) {
                    return;
                }
                const testingClass = yield this.importTestClass(file);
                (0, Log_1.logTitle)(`\nClass: ${testingClass.constructor.name}`);
                try {
                    const classMethods = (0, getClassMethods_1.getClassMethods)(testingClass).filter((key) => {
                        return this.shouldCallMethod(testingClass, key);
                    });
                    const testMethodsAsObject = {};
                    classMethods.forEach((key) => {
                        testMethodsAsObject[key] = key;
                    });
                    for (const key of classMethods) {
                        yield this.callTestMethod(testingClass, key);
                    }
                }
                catch (error) {
                    (0, Log_1.logError)('Error occurred');
                    (0, Log_1.logError)(error.message);
                    throw error;
                }
                finally {
                }
            }
            if (files.length && this.testsRun == this.tests) {
                this.finish();
            }
        });
    }
    run(folder) {
        return __awaiter(this, void 0, void 0, function* () {
            let files;
            try {
                files = yield this.fileGetter.setPath(folder).files();
                this.testFilesCount = files.length;
            }
            catch (error) {
                throw error;
            }
            (0, Log_1.logInfo)(`Starting tests in ${this.testFilesCount} file(s)...`);
            return yield this.workThroughTestFiles(files);
        });
    }
    finish() {
        const logFn = this.failedTests ? Log_1.logError : Log_1.logSuccess;
        const testReport = `${this.tests - this.failedTests}/${this.tests} passed`;
        logFn(`\n${this.tests} tests: ${testReport}`);
        if (this.failedTests) {
            (0, Log_1.logError)(`${this.failedTests} failed`);
        }
    }
}
exports.TestRunner = TestRunner;
