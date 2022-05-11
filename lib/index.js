"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCase = void 0;
const TestCase_1 = require("./Core/TestCase");
Object.defineProperty(exports, "TestCase", { enumerable: true, get: function () { return TestCase_1.TestCase; } });
const TestRunner_1 = require("./Core/TestRunner");
const args = [];
const startTime = new Date().getTime();
process.argv.forEach(function (val) {
    args.push(val.replace('tests', 'Tests'));
});
global.onerror = (error) => {
    console.warn(error);
};
const classJester = new TestRunner_1.TestRunner();
classJester.run(`./${args[2]}`).then(() => {
    const endTime = new Date().getTime();
    console.log(`Duration elapsed: ${(endTime - startTime) / 1000}s`);
});
