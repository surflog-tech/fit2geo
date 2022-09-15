import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import FitParser from 'fit-file-parser';

const dir = './assets/';
const fitFiles = ['7147163106_ACTIVITY.fit', 'Windsurfing20220913151106.fit'];
const resultFiles = ['FitParser-result-Garmin.json', 'FitParser-result-Coros.json'];

const options = {
  // mode: 'list',
  // mode: 'cascade',
  speedUnit: 'km/h',
  lengthUnit: 'km',
  elapsedRecordField: true,
};

async function parse(fitFile: string, resultFile: string) {
  const buffer = await readFile(fitFile);
  const fitParser = new FitParser(options);
  return new Promise((resolve, reject) => {
    fitParser.parse(buffer, (err, res) => {
      if (err) return reject(err);
      resolve(writeFile(resultFile, JSON.stringify(res, undefined, 2)));
    });
  });
}

describe('FitParser', () => {

  it('parse Garmin', async function() {
    return parse(join(dir, fitFiles[0]), join(dir, resultFiles[0]));
  });

  it('parse Coros', async function() {
    return parse(join(dir, fitFiles[1]), join(dir, resultFiles[1]));
  });

});
