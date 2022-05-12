import { TestCase } from '../Core/TestCase';
import { AssertionError } from '../Errors/AssertionError';

class AssertionsTest extends TestCase {
  async testCanCheckIfTrueEqualsTrue(): Promise<void> {
    this.assertTrue(true);
  }

  async testAssertionErrorThrownIfExpectedValueIsNotTrue(): Promise<void> {
    try {
      this.assertTrue(false);
    } catch (error: any) {
      this.assertTrue(error instanceof AssertionError);
      this.assertEquals('false is not equal to expected value: true', error.message);
    }
  }

  async testAssertionErrorThrownIfExpectedValueIsNotEqual(): Promise<void> {
    try {
      this.assertEquals(true, false);
    } catch (error: any) {
      this.assertTrue(error instanceof AssertionError);
      this.assertEquals('false is not equal to expected value: true', error.message);
    }
  }
}

export default AssertionsTest;
