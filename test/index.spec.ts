import assert from 'assert';
import { readFileSync } from 'fs';
import { coordAll, coordEach } from '@turf/meta';
import parseFit from '../src/parse';
import fit2geo from '../src/index';

// const fitFile = './assets/6829812928_ACTIVITY.fit';
const fitFile = './assets/7147163106_ACTIVITY.fit';

describe('fit2geo', () => {

  xit('should be able to parse a FIT file', async function() {
    this.timeout(10000);
    const fitData:ArrayBuffer = readFileSync(fitFile);
    return parseFit(fitData);
  });

  xit('should find multiple LineStrings', async function() {
    this.timeout(10000);
    const fitData:ArrayBuffer = readFileSync(fitFile);
    const result = await fit2geo(fitData);
    if (result.type !== 'Feature' || result.geometry.type !== 'MultiLineString') return assert.fail();
    const { geometry: { coordinates } } = result;
    assert.strictEqual(coordinates.length, 4);
  });

  it('should find equal amount of coordsMeta and coordinates', async function() {
    this.timeout(10000);
    const fitData:ArrayBuffer = readFileSync(fitFile);
    const result = await fit2geo(fitData);
    // @ts-ignore
    const coordinates = coordAll(result);
    // @ts-ignore
    const { properties: { coordsMeta } } = result;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    assert.strictEqual(coordsMeta.length, coordinates.length);
  });

  it('should find equal amount of coordsMeta and coordinates', async function() {
    this.timeout(10000);
    const fitData:ArrayBuffer = readFileSync(fitFile);
    const result = await fit2geo(fitData);
    // @ts-ignore
    const { properties: { coordsMeta } } = result;
    let indexLine = 0;
    // let diffs = 0;
    // @ts-ignore
    coordEach(result, (currentCoord, coordIndex, featureIndex, multiFeatureIndex) => {
      // console.log(featureIndex, multiFeatureIndex);
      if (indexLine !== multiFeatureIndex) {
        indexLine = multiFeatureIndex;
        return;
      }
      if (coordIndex === 0) return;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      const { time } = coordsMeta[coordIndex];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      const { time: timePrev } = coordsMeta[coordIndex - 1];
      const timeDiff = time - timePrev;
      if (timeDiff > 1000) {
        // diffs += 1;
        console.log(multiFeatureIndex, coordIndex);
      }
      // console.log(timeDiff);
    });
    // console.log(diffs);
  });

  xit('should log result', async function() {
    this.timeout(10000);
    const fitData:ArrayBuffer = readFileSync(fitFile);
    const result = await fit2geo(fitData);
    console.log(JSON.stringify(result));
  });

});
