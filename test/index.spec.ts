// import assert from 'assert';
import { readFileSync, writeFileSync } from 'fs';
import parseFit from '../src/parse';
import fit2geo from '../src/index';

// const fitFile = './assets/6829812928_ACTIVITY.fit';
const fitFile = './assets/7147163106_ACTIVITY.fit';
// const fitFile = './assets/6975723491_ACTIVITY.fit';

describe('fit2geo', () => {

  it('should be able to parse a FIT file', async function() {
    this.timeout(10000);
    const fitData:ArrayBuffer = readFileSync(fitFile);
    // return parseFit(fitData);
    writeFileSync('./assets/fit.json', JSON.stringify(await parseFit(fitData)));
  });

  it('should be able to analyze a FIT file', function() {
    this.timeout(10000);
    const fitData:ArrayBuffer = readFileSync(fitFile);
    return fit2geo(fitData);
  });

  it('should create file', async function() {
    this.timeout(10000);
    const fitData:ArrayBuffer = readFileSync(fitFile);
    const result = await fit2geo(fitData);
    writeFileSync('./assets/test.json', JSON.stringify(result));
  });

});
