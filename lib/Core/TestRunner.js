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
const GetFiles_1 = require("./GetFiles");
const emoji = require("node-emoji");
const Logger_1 = require("./Logging/Logger");
const SilentLogger_1 = require("./Logging/SilentLogger");
class TestRunner {
    constructor() {
        this.limitToFile = null;
        this.limitToTest = null;
        this.testFilesCount = 0;
        this.tests = 0;
        this.failedTests = 0;
        this.totalAssertions = 0;
        this.testsRun = 0;
        this.logger = new Logger_1.Logger();
        this.fileGetter = new GetFiles_1.GetFiles(this.logger);
    }
    putInSilentMode() {
        this.logger = new SilentLogger_1.SilentLogger();
        this.fileGetter = new GetFiles_1.GetFiles(this.logger);
    }
    checkForNoAssertions(testingClass) {
        if (testingClass.testAssertionCount === 0) {
            this.logger.logWarn('No assertions made in this test.');
        }
        return testingClass.testAssertionCount > 0;
    }
    shouldCallMethod(testingClass, methodName) {
        if (this.limitToTest && this.limitToTest !== methodName) {
            return;
        }
        return testingClass[methodName] instanceof Function && methodName.includes('test');
    }
    successOrNoAssertions(testingClass) {
        if (this.checkForNoAssertions(testingClass)) {
            this.logger.logSuccess(`${emoji.get(':white_check_mark:')} Hooray, test passed ${testingClass.testAssertionCount} assertions`);
        }
    }
    callTestMethod(testingClass, key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield testingClass.setUp();
                try {
                    this.logger.logInfo(`Test: ${key}`);
                    yield testingClass[key]();
                    this.successOrNoAssertions(testingClass);
                }
                catch (error) {
                    this.failedTests += 1;
                    if (error.constructor.name === AssertionError_1.AssertionError.name) {
                        this.logger.logError(' Test failed');
                        this.logger.logError(` ${error.message}`);
                        this.logger.logPlain(error.diff);
                        this.logger.logInfo(`${error.errorDetails}\n`);
                    }
                    else {
                        throw error;
                    }
                }
                finally {
                    this.testsRun += 1;
                    yield testingClass.tearDown();
                    this.totalAssertions += testingClass.testAssertionCount;
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
                const fileName = fileArray[fileArray.length - 1];
                if (!fileName.includes('Test')) {
                    return;
                }
                if (this.limitToFile && fileName !== this.limitToFile) {
                    return;
                }
                const testingClass = yield this.importTestClass(file);
                this.logger.logTitle(`\nClass: ${testingClass.constructor.name}`);
                try {
                    const classMethods = (0, getClassMethods_1.getClassMethods)(testingClass).filter((key) => {
                        return this.shouldCallMethod(testingClass, key);
                    });
                    this.tests += classMethods.length;
                    for (const key of classMethods) {
                        yield this.callTestMethod(testingClass, key);
                    }
                }
                catch (error) {
                    this.logger.logError('Error occurred');
                    this.logger.logError(error.message);
                    throw error;
                }
                finally {
                }
            }
            if (this.testFilesCount && this.testsRun === this.tests) {
                return this.finish();
            }
        });
    }
    run(folder, file = null, test = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (file && file !== 'undefined') {
                this.limitToFile = `${file}.js`.replace('.js.js', '.js');
            }
            this.limitToTest = test !== 'undefined' ? test : null;
            let files;
            try {
                files = yield this.fileGetter.setPath(folder).files();
                this.testFilesCount = this.limitToFile ? 1 : files.length;
            }
            catch (error) {
                throw error;
            }
            this.logger.logInfo(`Starting tests in ${this.testFilesCount} file(s)...`);
            return yield this.workThroughTestFiles(files);
        });
    }
    finish() {
        const logFn = this.failedTests ? 'logError' : 'logSuccess';
        const testReport = `${this.tests - this.failedTests}/${this.tests} passed`;
        this.logger[logFn](`\n${this.tests} tests: ${testReport}, ${this.totalAssertions} assertions`);
        if (this.failedTests) {
            this.logger.logError(`${this.failedTests} failed`);
            return false;
        }
        return true;
    }
}
exports.TestRunner = TestRunner;
