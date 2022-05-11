"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassMethods = void 0;
const getClassMethods = (classObject) => {
    const props = [];
    let obj = classObject;
    do {
        props.push(...Object.getOwnPropertyNames(obj));
    } while ((obj = Object.getPrototypeOf(obj)));
    return props.sort().filter((e, i, arr) => {
        if (e != arr[i + 1] && typeof classObject[e] == 'function')
            return true;
    });
};
exports.getClassMethods = getClassMethods;
