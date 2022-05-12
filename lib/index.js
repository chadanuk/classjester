"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const TestRunner_1 = require("./Core/TestRunner");
const args = [];
const startTime = new Date().getTime();
process.argv.forEach(function (val) {
    args.push(val.replace('tests', 'Tests'));
});
global.onerror = (error) => {
    console.warn(error);
};
try {
    const classJester = new TestRunner_1.TestRunner();
    classJester.run(`./${args[2]}`).then(() => {
        const endTime = new Date().getTime();
        console.log(`Duration elapsed: ${(endTime - startTime) / 1000}s`);
        (0, process_1.exit)(0);
    });
}
catch (error) {
    console.error(error.message);
    (0, process_1.exit)(0);
}
