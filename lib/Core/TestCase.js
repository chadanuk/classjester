"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCase = void 0;
const Assertions_1 = require("./Assertions");
const GetFiles_1 = require("./GetFiles");
class TestCase extends Assertions_1.Assertions {
    constructor() {
        super();
        this.fileGetter = new GetFiles_1.GetFiles();
    }
    setUp() { }
    tearDown() { }
}
exports.TestCase = TestCase;
