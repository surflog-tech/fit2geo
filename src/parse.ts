// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./fit-file-parser.d.ts"/>
import FitParser from 'fit-file-parser';
import { Fit } from './index.d';

const options = {
  mode: 'list',
  speedUnit: 'km/h',
  lengthUnit: 'km',
  elapsedRecordField: true,
};

function parseFit(buffer: ArrayBuffer): Promise<Fit> {
  return new Promise((resolve, reject) => {
    const fitParser = new FitParser(options);
    fitParser.parse(buffer, (err, res) => {
      if (err) return reject(err);
      resolve(res as Fit);
    });
  });
}

export default parseFit;
