import { exit } from 'process';
import { TestCase } from './Core/TestCase';
import { TestRunner } from './Core/TestRunner';
const args: { [key: string | number]: string | boolean } = {};
const startTime = new Date().getTime();
process.argv.forEach(function (val: string, index: number) {
  let key = 'folder';
  let value = val.replace(/"/g, '');
  if (value.includes('=')) {
    [key, value] = value.split('=');
  }

  args[key.replace('--', '')] = value == undefined ? true : value;
});

global.onerror = (error) => {
  console.warn(error);
};
try {
  const classJester = new TestRunner();
  const folder: string = `./${args.folder}`;

  if (args.silent) {
    classJester.putInSilentMode();
  }

  classJester.run(folder, `${args.file}`, `${args.test}`).then(() => {
    const endTime = new Date().getTime();
    console.log(`Duration elapsed: ${(endTime - startTime) / 1000}s`);
    exit(0);
  });
} catch (error: any) {
  console.error(error.message);
  exit(0);
}
