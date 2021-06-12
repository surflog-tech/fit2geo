"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const index_1 = __importDefault(require("./index"));
// const [,,fitFile] = process.argv;
const fitFile = './assets/6829812928_ACTIVITY.fit';
describe('fit2geo', () => {
    it('should be able to parse a FIT file', async () => {
        const fitData = fs_1.readFileSync(fitFile);
        const result = await index_1.default(fitData);
        // console.log(result);
    });
});
