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

  public testHasFileGetter() {
    const testCase = new TestCase();

    this.assertType(GetFiles, testCase['fileGetter']);
  }
}

export default TestCaseTest;
