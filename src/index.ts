import { TestCase } from './Core/TestCase';
import { TestRunner } from './Core/TestRunner';
const args: string[] = [];
const startTime = new Date().getTime();
process.argv.forEach(function (val: string) {
  args.push(val.replace('tests', 'Tests'));
});

global.onerror = (error) => {
  console.warn(error);
};

const classJester = new TestRunner();

classJester.run(`./${args[2]}`).then(() => {
  const endTime = new Date().getTime();
  console.log(`Duration elapsed: ${(endTime - startTime) / 1000}s`);
});

export { TestCase };
