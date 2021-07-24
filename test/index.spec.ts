import assert from 'assert';
import { readFileSync } from 'fs';
import parseFit from '../src/parse';
import fit2geo from '../src/index';

// const fitFile = './assets/6829812928_ACTIVITY.fit';
const fitFile = './assets/7147163106_ACTIVITY.fit';

describe('fit2geo', () => {

  it('should be able to parse a FIT file', async function() {
    this.timeout(10000);
    const fitData:ArrayBuffer = readFileSync(fitFile);
    return parseFit(fitData);
  });

  it('should find multiple LineStrings', async function() {
    this.timeout(10000);
    const fitData:ArrayBuffer = readFileSync(fitFile);
    const result = await fit2geo(fitData);
    if (result.type !== 'Feature' || result.geometry.type !== 'MultiLineString') return assert.fail();
    const { geometry: { coordinates } } = result;
    assert.strictEqual(coordinates.length, 4);
  });

  xit('should log result', async function() {
    this.timeout(10000);
    const fitData:ArrayBuffer = readFileSync(fitFile);
    const result = await fit2geo(fitData);
    console.log(JSON.stringify(result));
  });

});
