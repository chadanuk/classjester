import { logError, logInfo, logSuccess } from '../Helpers/Log';
import { diff } from 'jest-diff';

declare interface AssertionError {}

class AssertionError extends Error {
  public errorDetails: string;
  public expected: any;
  public value: any;
  public diff: string | null;

  constructor(message: string, expected: any, value: any) {
    super(message);

    this.expected = expected;
    this.value = value;
    this.errorDetails = this.stack === undefined ? '' : this.stack?.split('\n').splice(1, 3).join('\n');
    this.diff = diff(this.expected, this.value);
  }
}

export { AssertionError };
