"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = __importDefault(require("./parse"));
const transform_1 = __importDefault(require("./transform"));
async function handler(buffer) {
    const { records } = await parse_1.default(buffer);
    return transform_1.default(records);
}
exports.default = handler;
