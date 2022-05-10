import { TestCase } from './Core/TestCase';
import { TestRunner } from './Core/TestRunner';
const args: string[] = [];

process.argv.forEach(function (val: string) {
  args.push(val.replace('tests', 'Tests'));
});

global.onerror = (error) => {
  console.warn(error);
};

const classJester = new TestRunner();

classJester.run(`./${args[2]}`);

export { TestCase };
