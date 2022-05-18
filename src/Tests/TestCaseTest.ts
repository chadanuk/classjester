import { GetFiles } from '../Core/GetFiles';
import { TestCase } from '../Core/TestCase';

class TestCaseTest extends TestCase {
  constructor() {
    super();
  }

  public testSetUpExists() {
    const testCase = new TestCase();

    this.assertType('function', testCase['setUp']);
  }

  public testTearDownExists() {
    const testCase = new TestCase();

    this.assertType('function', testCase['tearDown']);
  }
}

export default TestCaseTest;
