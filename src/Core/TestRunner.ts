import { AssertionError } from '../Errors/AssertionError';
import { getClassMethods } from '../Helpers/getClassMethods';
import { logInfo, logError, logSuccess, logWarn } from '../Helpers/Log';
import { GetFiles } from './GetFiles';

class TestRunner {
  private fileGetter: GetFiles;
  private tests = 0;
  private failedTests = 0;

  constructor() {
    this.fileGetter = new GetFiles();
  }

  private checkforNoAssertions(testingClass: any) {
    if (testingClass.testAssertionCount === 0) {
      logWarn('No assertions made in this test.');
    }

    return testingClass.testAssertionCount > 0;
  }

  private async callTestMethod(testingClass: any, key: string) {
    if (!key.includes('test')) {
      return;
    }

    logInfo(`Class: ${testingClass.constructor.name}`);
    if (testingClass[key] instanceof Function) {
      await testingClass.setUp();

      try {
        logInfo(`Method: ${key}`);
        this.tests += 1;
        await testingClass[key]();

        if (this.checkforNoAssertions(testingClass)) {
          logSuccess(`Hooray test passed ${testingClass.testAssertionCount} assertions`);
        }
      } catch (error) {
        this.failedTests += 1;
        if (error instanceof AssertionError) {
          logInfo(`Method: ${key}`);
          logError('Test failed');
          logError(error.message);
          logInfo(error.errorDetails);
        }
      } finally {
        testingClass.resetTestAssertionCount();
      }

      await testingClass.tearDown();
      testingClass = null;
    }
  }

  public async run(folder: string) {
    logInfo('Starting tests...');

    let files: Array<string>;
    try {
      files = await this.fileGetter.setPath(folder).files();
    } catch (error) {
      throw error;
    }

    files.forEach(async (file: string) => {
      const fileArray: string[] = file.split('/');

      if (!fileArray[fileArray.length - 1].includes('Test')) {
        return;
      }
      try {
        let testingClass: any;

        let filePath = `${process.cwd()}/${file.replace('./lib/Tests/', 'lib/Tests/')}`.replace(/\/\//g, '/');
        if (process.env.IS_SELF) {
          testingClass = new (await import(filePath)).default();
        } else {
          filePath = `${process.cwd()}/${file}`.replace('./', '').replace(/\/\//g, '/');

          testingClass = new (await import(filePath)).default();
        }

        getClassMethods(testingClass).forEach(async (key: string) => {
          setTimeout(async () => {
            await this.callTestMethod(testingClass, key);
          });
        });
      } catch (error: any) {
        logError('Error occurred');
        logError(error.message);
        throw error;
      }
    });
    if (this.failedTests) {
      logError(`${this.failedTests} failed`);
    }
    logInfo(`${this.tests} Tests`);
  }
}
export { TestRunner };
