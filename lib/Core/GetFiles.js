"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFiles = void 0;
const fs_1 = require("fs");
const Log_1 = require("../Helpers/Log");
class GetFiles {
    constructor() {
        this.foundFiles = [];
        this.path = './';
    }
    setPath(path) {
        this.path = path;
        return this;
    }
    getFilesInDirectory(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const objectsInDirectory = yield (0, fs_1.readdirSync)(dir, { withFileTypes: true });
                objectsInDirectory.forEach((file) => {
                    if (file.isDirectory()) {
                        this.getFilesInDirectory(`${dir}/${file.name}`);
                        return;
                    }
                    if (file.name.includes('.d.ts') || !file.name.includes('Test')) {
                        return;
                    }
                    this.foundFiles.push(`${dir}/${file.name}`);
                });
            }
            catch (error) {
                (0, Log_1.logError)(error.message);
            }
        });
    }
    files() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getFilesInDirectory(this.path);
            return this.foundFiles;
        });
    }
}
exports.GetFiles = GetFiles;
