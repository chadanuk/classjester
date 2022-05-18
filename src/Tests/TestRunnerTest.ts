import { GetFiles } from '../Core/GetFiles';
import { TestCase } from '../Core/TestCase';
import { TestRunner } from '../Core/TestRunner';

class TestCaseTest extends TestCase {
  constructor() {
    super();
  }

  public testHasRunFunction() {
    const testRunner = new TestRunner();

    this.assertType('function', testRunner['run']);
  }

  public async testErrorsWithNonValidFolder() {
    const testRunner = new TestRunner();

    try {
      await testRunner.run('some-folder');
    } catch (error: any) {
      this.assertEquals(`ENOENT: no such file or directory, scandir 'some-folder'`, error.message);
    }
  }
}

export default TestCaseTest;
