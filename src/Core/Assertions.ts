import { AssertionError } from '../Errors/AssertionError';

class Assertions {
  public testAssertionCount = 0;

  throwError(message: string, expected: any, value: any) {
    let messageValue = value === undefined ? '[[value]]' : JSON.stringify(value);
    let messageExpected = expected === undefined ? '[[expected]]' : JSON.stringify(expected);

    throw new AssertionError(
      message.replace(/{{value}}/g, messageValue).replace(/{{expected}}/, messageExpected),
      expected,
      value,
    );
  }

  assertTrue(value: any, errorMessage: string | null = null) {
    try {
      return this.assertEquals(true, value);
    } catch (error: any) {
      let message = errorMessage ? errorMessage : `${value.toString()} is not equal to expected value: true`;

      this.throwError(message, true, value);
    }
  }

  assertFalse(value: any, errorMessage: string | null = null) {
    try {
      return this.assertEquals(false, value);
    } catch (error: any) {
      let message = errorMessage ? errorMessage : `${value.toString()} is not equal to expected value: false`;

      this.throwError(message, true, value);
    }
  }

  assertEquals(expected: any, value: any) {
    this.testAssertionCount += 1;
    if (JSON.stringify(value) === JSON.stringify(expected)) {
      return true;
    }

    this.throwError(
      `${JSON.stringify(value)} is not equal to expected value: ${JSON.stringify(expected)}`,
      expected,
      value,
    );
  }

  assertType(expected: any, value: any) {
    this.testAssertionCount += 1;
    if (typeof expected === 'string' && typeof value === expected) {
      return true;
    }

    if (typeof expected !== 'string' && value instanceof expected) {
      return true;
    }

    this.throwError(`${value} is not of type ${expected}`, expected, value);
  }

  assertNotEquals(expected: any, value: any, message: any = null) {
    this.testAssertionCount += 1;
    if (JSON.stringify(value) !== JSON.stringify(expected)) {
      return true;
    }

    this.throwError(`${value.toString()} is equal to: ${expected.toString()} and it should not be`, expected, value);
  }

  assertNotUndefined(value: any) {
    try {
      return this.assertNotEquals(undefined, value);
    } catch (error) {
      this.throwError('Value is undefined', undefined, value);
    }
  }

  assertCount(expected: Number, value: any) {
    this.testAssertionCount += 1;
    let countableValue = value;
    if (typeof value === 'object') {
      countableValue = Object.keys(value);
    }
    if (expected === countableValue.length) {
      return true;
    }

    this.throwError(
      `Count of ${JSON.stringify({ value })} (${
        countableValue.length
      }) is not equal to expected value: ${expected.toString()}`,
      expected,
      value,
    );
  }

  failTest(message: string = 'Test marked as failed.') {
    this.testAssertionCount += 1;
    this.throwError(message, null, null);
  }

  resetTestAssertionCount() {
    this.testAssertionCount = 0;
  }
}

export { Assertions };
