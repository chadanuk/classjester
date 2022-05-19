import { TestCase } from '../Core/TestCase';
import { AssertionError } from '../Errors/AssertionError';

class AssertionsTest extends TestCase {
  async testCanCheckIfTrueEqualsTrue(): Promise<void> {
    this.assertTrue(true);
  }

  async testCanCheckIfFalseEqualsFalse(): Promise<void> {
    this.assertFalse(false);
  }

  async testAssertionErrorThrownIfExpectedValueIsNotTrue(): Promise<void> {
    try {
      this.assertTrue(false);
    } catch (error: any) {
      this.assertTrue(error instanceof AssertionError);
      this.assertEquals('false is not equal to expected value: true', error.message);
      this.assertEquals(
        `\u001b[32m-Expected\u001b[39m\u001b[31m+Received\u001b[39m\u001b[32m-true\u001b[39m\u001b[31m+false\u001b[39m`.replace(
          /\s/g,
          '',
        ),
        error.diff.replace(/\s/g, ''),
      );
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

  testTypeOfChecksTypeCorrectly() {
    try {
      this.assertType('string', 'some string');
    } catch (error) {
      this.failTest('String check fails');
    }
  }

  testCanAssertCount() {
    try {
      this.assertCount(2, ['a', 'b']);
      this.assertCount(2, { id: 'a', value: 'b' });
    } catch (error) {
      this.failTest('Count assertion fails');
    }
  }
}

export default AssertionsTest;
