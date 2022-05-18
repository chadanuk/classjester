import { AssertionError } from '../Errors/AssertionError';
import { logInfo, logError } from '../Helpers/Log';
import { Assertions } from './Assertions';
import { GetFiles } from './GetFiles';

class TestCase extends Assertions {
  constructor() {
    super();
  }

  public setUp() {}
  public tearDown() {}
}

export { TestCase };
