"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const TestRunner_1 = require("./Core/TestRunner");
const args = {};
const startTime = new Date().getTime();
process.argv.forEach(function (val, index) {
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
    const classJester = new TestRunner_1.TestRunner();
    const folder = `./${args.folder}`;
    if (args.silent) {
        classJester.putInSilentMode();
    }
    classJester.run(folder, `${args.file}`, `${args.test}`).then(() => {
        const endTime = new Date().getTime();
        console.log(`Duration elapsed: ${(endTime - startTime) / 1000}s`);
        (0, process_1.exit)(0);
    });
}
catch (error) {
    console.error(error.message);
    (0, process_1.exit)(0);
}
