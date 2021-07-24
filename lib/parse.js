"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./fit-file-parser.d.ts"/>
const fit_file_parser_1 = __importDefault(require("fit-file-parser"));
const options = {
    mode: 'list',
    speedUnit: 'km/h',
    elapsedRecordField: true,
    // force: false,
};
function parseFit(buffer) {
    return new Promise((resolve, reject) => {
        const fitParser = new fit_file_parser_1.default(options);
        fitParser.parse(buffer, (err, res) => {
            if (err)
                return reject(err);
            resolve(res);
        });
    });
}
exports.default = parseFit;
