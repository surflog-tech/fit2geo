// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./fit-file-parser.d.ts"/>
import { FeatureCollection } from 'geojson';
import FitParser from 'fit-file-parser';
import transform from './transform';
import { Fit } from './index.d';

function parseFit(buffer: ArrayBuffer): Promise<Fit> {
  return new Promise((resolve, reject) => {
    const fitParser = new FitParser();
    fitParser.parse(buffer, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
}

async function handler(buffer: ArrayBuffer): Promise<FeatureCollection> {
  const { records } = await parseFit(buffer);
  return transform(records);
}

export default handler;
