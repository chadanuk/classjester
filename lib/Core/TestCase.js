"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCase = void 0;
const Assertions_1 = require("./Assertions");
class TestCase extends Assertions_1.Assertions {
    constructor() {
        super();
    }
    setUp() { }
    tearDown() { }
}
exports.TestCase = TestCase;
