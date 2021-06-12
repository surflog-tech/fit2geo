"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const index_1 = __importDefault(require("./index"));
function handler(filePath) {
    return promises_1.readFile(filePath).then(index_1.default).then(JSON.stringify).then(console.log);
}
const [, , fitFile] = process.argv;
if (typeof fitFile === 'string') {
    void handler(fitFile);
}
