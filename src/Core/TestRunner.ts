import { AssertionError } from '../Errors/AssertionError';
import { getClassMethods } from '../Helpers/getClassMethods';
import { logTitle, logInfo, logError, logSuccess, logWarn } from '../Helpers/Log';
import { GetFiles } from './GetFiles';
import * as emoji from 'node-emoji';
import { log } from 'console';

class TestRunner {
  private fileGetter: GetFiles;
  private testFilesCount = 0;
  private tests = 0;

  private testsRun = 0;
  private failedTests = 0;

  constructor() {
    this.fileGetter = new GetFiles();
  }

  private checkForNoAssertions(testingClass: any) {
    if (testingClass.testAssertionCount === 0) {
      logWarn('No assertions made in this test.');
    }

    return testingClass.testAssertionCount > 0;
  }

  private shouldCallMethod(testingClass: any, methodName: string) {
    return testingClass[methodName] instanceof Function && methodName.includes('test');
  }

  private successOrNoAssertions(testingClass: any) {
    if (this.checkForNoAssertions(testingClass)) {
      logSuccess(
        `${emoji.get(':white_check_mark:')} Hooray, test passed ${testingClass.testAssertionCount} assertions`,
      );
    }
  }

  private async callTestMethod(testingClass: any, key: string) {
    return new Promise(async (resolve, reject) => {
      this.tests += 1;

      await testingClass.setUp();
      try {
        logInfo(`Test: ${key}`);
        await testingClass[key]();

        this.successOrNoAssertions(testingClass);
      } catch (error: any) {
        this.failedTests += 1;

        if (error.constructor.name === AssertionError.name) {
          logError('Test failed');
          logError(error.message);
          error.outputDiff();
          logInfo(error.errorDetails);
        } else {
          throw error;
        }
      } finally {
        this.testsRun += 1;
        await testingClass.tearDown();
        testingClass.resetTestAssertionCount();
        resolve(true);
      }
    });
  }

  private async importTestClass(file: string) {
    let filePath: string = '';
    if (process.env.IS_SELF) {
      filePath = `${process.cwd()}/${file.replace('./lib/Tests/', 'lib/Tests/')}`.replace(/\/\//g, '/');
    } else {
      filePath = `${process.cwd()}/${file}`.replace('./', '').replace(/\/\//g, '/');
    }
    return new (await import(filePath)).default();
  }

  private async workThroughTestFiles(files: string[]) {
    for (const file of files) {
      const fileArray: string[] = file.split('/');

      if (!fileArray[fileArray.length - 1].includes('Test')) {
        return;
      }

      const testingClass: any = await this.importTestClass(file);
      logTitle(`\nClass: ${testingClass.constructor.name}`);
      try {
        const classMethods: string[] = getClassMethods(testingClass).filter((key: string) => {
          return this.shouldCallMethod(testingClass, key);
        });

        const testMethodsAsObject: { [key: string]: string } = {};
        classMethods.forEach((key: string) => {
          testMethodsAsObject[key] = key;
        });

        for (const key of classMethods) {
          await this.callTestMethod(testingClass, key);
        }
      } catch (error: any) {
        logError('Error occurred');
        logError(error.message);
        throw error;
      } finally {
      }
    }

    if (files.length && this.testsRun == this.tests) {
      this.finish();
    }
  }

  public async run(folder: string) {
    let files: Array<string>;
    try {
      files = await this.fileGetter.setPath(folder).files();

      this.testFilesCount = files.length;
    } catch (error) {
      throw error;
    }

    logInfo(`Starting tests in ${this.testFilesCount} file(s)...`);

    return await this.workThroughTestFiles(files);
  }

  finish() {
    const logFn = this.failedTests ? logError : logSuccess;
    const testReport = `${this.tests - this.failedTests}/${this.tests} passed`;

    logFn(`\n${this.tests} tests: ${testReport}`);
    if (this.failedTests) {
      logError(`${this.failedTests} failed`);
    }
  }
}
export { TestRunner };
