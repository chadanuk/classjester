import { logSuccess } from '../Helpers/Log';

declare interface AssertionError {}

class AssertionError extends Error {
  public errorDetails: string;

  constructor(message: string) {
    super(message);

    this.errorDetails = this.stack === undefined ? '' : this.stack?.split('\n')[2];
  }
}

export { AssertionError };
