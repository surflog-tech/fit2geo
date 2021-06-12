"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./modules.d.ts"/>
const fit_file_parser_1 = __importDefault(require("fit-file-parser"));
const transform_1 = __importDefault(require("./transform"));
function parseFit(buffer) {
    return new Promise((resolve, reject) => {
        const fitParser = new fit_file_parser_1.default();
        fitParser.parse(buffer, (err, res) => {
            if (err)
                return reject(err);
            resolve(res);
        });
    });
}
async function handler(buffer) {
    const { records } = await parseFit(buffer);
    return transform_1.default(records);
}
exports.default = handler;
