/// <reference path="./modules.d.ts"/>
import { default as FitParser } from 'fit-file-parser';
import transform from './transform';
import { Fit, NullOrError } from './index.d';

function parseFit(buffer: ArrayBuffer) {
  return new Promise<Fit>((resolve, reject) => {
    const fitParser = new FitParser();
    fitParser.parse(buffer, (err: NullOrError, res: Fit) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
}

async function handler(buffer: ArrayBuffer) {
  const { records } = await parseFit(buffer);
  return transform(records);
}

export default handler;
