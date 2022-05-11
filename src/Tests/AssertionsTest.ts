import { TestCase } from '../Core/TestCase';

class AssertionsTest extends TestCase {
  async testCanCheckIfTrueEqualsTrue(): Promise<void> {
    this.assertTrue(true);
  }
}

export default AssertionsTest;
