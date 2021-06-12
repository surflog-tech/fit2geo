"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { GeoJSON } from 'geojson';
const fs_1 = require("fs");
const index_1 = __importDefault(require("./index"));
// const [,,fitFile] = process.argv;
const fitFile = './assets/6829812928_ACTIVITY.fit';
describe('fit2geo', () => {
    it('should be able to parse a FIT file', async () => {
        const fitData = fs_1.readFileSync(fitFile);
        return index_1.default(fitData);
        // const result:GeoJSON = await fit2geo(fitData);
        // console.log(result);
    });
});
