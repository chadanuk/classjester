import { logSuccess } from '../Helpers/Log';

declare interface AssertionError {}

class AssertionError extends Error {
  public errorDetails: string;

  constructor(message: string) {
    super(message);

    this.errorDetails = this.stack === undefined ? '' : this.stack?.split('\n').splice(1, 3).join('\n');
  }
}

export { AssertionError };
