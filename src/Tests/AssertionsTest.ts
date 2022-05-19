import { TestCase } from '../Core/TestCase';
import { AssertionError } from '../Errors/AssertionError';

class AssertionsTest extends TestCase {
  async testCanCheckIfTrueEqualsTrue(): Promise<void> {
    this.assertTrue(true);
    this.assertEquals(1, this.testAssertionCount);
  }

  async testAssertionErrorThrownIfExpectedValueIsNotTrue(): Promise<void> {
    try {
      this.assertTrue(false);
    } catch (error: any) {
      this.assertEquals(1, this.testAssertionCount);
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

  async testCanCheckIfFalseEqualsFalse(): Promise<void> {
    this.assertFalse(false);
    this.assertEquals(1, this.testAssertionCount);
  }

  async testAssertionErrorThrownIfExpectedValueIsNotFalse(): Promise<void> {
    try {
      this.assertFalse(true);
    } catch (error: any) {
      this.assertEquals(1, this.testAssertionCount);
      this.assertTrue(error instanceof AssertionError);
      this.assertEquals('true is not equal to expected value: false', error.message);
    }
  }

  async testCanThrowCustomErrorIfTrueNotFalse(): Promise<void> {
    try {
      this.assertFalse(true, 'Value should be no');
    } catch (error: any) {
      this.assertEquals(1, this.testAssertionCount);
      this.assertTrue(error instanceof AssertionError);
      this.assertEquals('Value should be no', error.message);
    }
  }

  async testAssertionErrorThrownIfExpectedValueIsNotEqual(): Promise<void> {
    try {
      this.assertEquals(true, false);
    } catch (error: any) {
      this.assertEquals(1, this.testAssertionCount);
      this.assertTrue(error instanceof AssertionError);
      this.assertEquals('false is not equal to expected value: true', error.message);
    }
  }

  testTypeOfStringChecksTypeCorrectly() {
    try {
      this.assertType('string', 'some string');
      this.assertEquals(1, this.testAssertionCount);
    } catch (error) {
      this.failTest('String check fails');
    }
  }

  testTypeOfObjectChecksTypeCorrectly() {
    try {
      this.assertType('object', 'some string');
    } catch (error: any) {
      this.assertEquals(1, this.testAssertionCount);
      this.assertTrue(error instanceof AssertionError);
      this.assertEquals('some string is not of type object', error.message);
    }
  }

  testTypeOfClassChecksTypeCorrectly() {
    class BClass {}
    const b: BClass = new BClass();

    this.assertType(BClass, b);
    this.assertEquals(1, this.testAssertionCount);
  }

  testCanAssertNotEquals() {
    try {
      this.assertNotEquals(true, false);
      this.assertEquals(1, this.testAssertionCount);
    } catch (error) {
      this.failTest('NotEquals assertion fails');
    }
  }

  testAssertNotEqualsAndThrowsErrorIfTrue() {
    try {
      this.assertNotEquals(true, true);
    } catch (error: any) {
      this.assertEquals(1, this.testAssertionCount);
      this.assertTrue(error instanceof AssertionError);
      this.assertEquals('true is equal to: true and it should not be', error.message);
    }
  }

  testCanAssertCount() {
    try {
      this.assertCount(2, ['a', 'b']);
      this.assertCount(2, { id: 'a', value: 'b' });
      this.assertEquals(2, this.testAssertionCount);
    } catch (error) {
      this.failTest('Count assertion fails');
    }
  }

  testCanAssertCountAndThrowError() {
    try {
      this.assertCount(3, ['a', 'b']);
    } catch (error: any) {
      this.assertEquals(1, this.testAssertionCount);
      this.assertTrue(error instanceof AssertionError);
      this.assertEquals('Count of {"value":["a","b"]} (2) is not equal to expected value: 3', error.message);
    }
  }
}

export default AssertionsTest;
