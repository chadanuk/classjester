import { AssertionError } from '../Errors/AssertionError';
import { getClassMethods } from '../Helpers/getClassMethods';
import { GetFiles } from './GetFiles';
import * as emoji from 'node-emoji';
import { LoggerInterface } from './Logging/LoggerInterface';
import { Logger } from './Logging/Logger';
import { SilentLogger } from './Logging/SilentLogger';

class TestRunner {
  private limitToFile: string | null = null;
  private limitToTest: string | null = null;
  private fileGetter: GetFiles;
  private testFilesCount = 0;
  private tests = 0;
  private failedTests = 0;

  public logger: LoggerInterface;
  public totalAssertions = 0;
  public testsRun = 0;

  constructor() {
    this.logger = new Logger();
    this.fileGetter = new GetFiles(this.logger);
  }

  public putInSilentMode() {
    this.logger = new SilentLogger();
    this.fileGetter = new GetFiles(this.logger);
  }

  private checkForNoAssertions(testingClass: any) {
    if (testingClass.testAssertionCount === 0) {
      this.logger.logWarn('No assertions made in this test.');
    }

    return testingClass.testAssertionCount > 0;
  }

  private shouldCallMethod(testingClass: any, methodName: string) {
    if (this.limitToTest && this.limitToTest !== methodName) {
      return;
    }
    return testingClass[methodName] instanceof Function && methodName.includes('test');
  }

  private successOrNoAssertions(testingClass: any) {
    if (this.checkForNoAssertions(testingClass)) {
      this.logger.logSuccess(
        `${emoji.get(':white_check_mark:')} Hooray, test passed ${testingClass.testAssertionCount} assertions`,
      );
    }
  }

  private async callTestMethod(testingClass: any, key: string) {
    return new Promise(async (resolve, reject) => {
      await testingClass.setUp();
      try {
        this.logger.logInfo(`Test: ${key}`);
        await testingClass[key]();

        this.successOrNoAssertions(testingClass);
      } catch (error: any) {
        this.failedTests += 1;

        if (error.constructor.name === AssertionError.name) {
          this.logger.logError(' Test failed');
          this.logger.logError(` ${error.message}`);
          this.logger.logPlain(error.diff);
          this.logger.logInfo(`${error.errorDetails}\n`);
        } else {
          throw error;
        }
      } finally {
        this.testsRun += 1;
        await testingClass.tearDown();
        this.totalAssertions += testingClass.testAssertionCount;
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
      const fileName: string = fileArray[fileArray.length - 1];
      if (!fileName.includes('Test')) {
        return;
      }

      if (this.limitToFile && fileName !== this.limitToFile) {
        return;
      }

      const testingClass: any = await this.importTestClass(file);
      this.logger.logTitle(`\nClass: ${testingClass.constructor.name}`);
      try {
        const classMethods: string[] = getClassMethods(testingClass).filter((key: string) => {
          return this.shouldCallMethod(testingClass, key);
        });
        this.tests += classMethods.length;
        for (const key of classMethods) {
          await this.callTestMethod(testingClass, key);
        }
      } catch (error: any) {
        this.logger.logError('Error occurred');
        this.logger.logError(error.message);
        throw error;
      } finally {
      }
    }
    if (this.testFilesCount && this.testsRun === this.tests) {
      return this.finish();
    }
  }

  public async run(folder: string, file: string | null = null, test: string | null = null) {
    if (file && file !== 'undefined') {
      this.limitToFile = `${file}.js`.replace('.js.js', '.js');
    }
    this.limitToTest = test !== 'undefined' ? test : null;

    let files: Array<string>;
    try {
      files = await this.fileGetter.setPath(folder).files();

      this.testFilesCount = this.limitToFile ? 1 : files.length;
    } catch (error) {
      throw error;
    }

    this.logger.logInfo(`Starting tests in ${this.testFilesCount} file(s)...`);

    return await this.workThroughTestFiles(files);
  }

  finish(): boolean {
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
export { TestRunner };
