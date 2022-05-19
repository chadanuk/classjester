import { GetFiles } from '../Core/GetFiles';
import { TestCase } from '../Core/TestCase';
import rewiremock from 'rewiremock';

import { TestRunner } from '../Core/TestRunner';
import * as mock from 'mock-fs';

class TestRunnerTest extends TestCase {
  private testRunner: TestRunner;

  constructor() {
    super();
    this.testRunner = new TestRunner();
  }

  public testHasRunFunction() {
    this.assertType('function', this.testRunner['run']);
  }

  public async testErrorsWithNonValidFolder() {
    try {
      await this.testRunner.run('some-folder');
    } catch (error: any) {
      this.assertEquals(`ENOENT: no such file or directory, scandir 'some-folder'`, error.message);
    }
  }

  public async testRunFunction() {
    const thisTestCase = this;

    rewiremock(`${process.cwd()}/mockedTests/SomeFileTest.js`).with(
      (module.exports = {
        default: class SomeFileTest extends TestCase {
          testFakeTest() {
            this.assertTrue(true);
            thisTestCase.assertTrue(true);
          }
        },
      }),
    );
    rewiremock(`${process.cwd()}/mockedTests/sub-dir/SomeOtherFileTest.js`).with(
      (module.exports = {
        default: class SomeFileTest extends TestCase {
          testOtherFakeTest() {
            this.assertTrue(false);
            thisTestCase.assertTrue(true);
          }
        },
      }),
    );
    rewiremock.enable();

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
      await this.testRunner.run('mockedTests');
      this.assertEquals(2, this.testRunner.testsRun);
    } catch (error: any) {
      this.failTest("TestRunner doesn't run tests correctly");
    } finally {
      // after a test runs
      mock.restore();
      rewiremock.disable();
    }
  }

  public async testNoAssertionsFunction() {
    const thisTestCase = this;
    rewiremock(`${process.cwd()}/mockedTests/NoAssertionsTest.js`).with(
      (module.exports = {
        default: class NoAssertionsTest extends TestCase {
          noAssertionsTest() {
            thisTestCase.assertTrue(true);
          }
        },
      }),
    );

    rewiremock.enable();

    mock({
      mockedTests: {
        'NoAssertionsTest.js': 'export new Class {}',
      },
    });

    try {
      await this.testRunner.run('mockedTests');
    } catch (error: any) {
      this.assertEquals(1, this.testRunner.testsRun);
      this.assertEquals(0, this.testRunner.totalAssertions);
    } finally {
      // after a test runs
      mock.restore();
      rewiremock.disable();
    }
  }
}

export default TestRunnerTest;
