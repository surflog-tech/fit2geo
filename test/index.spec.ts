import { readFileSync } from 'fs';
import parseFit from '../src/parse';
// import simplify from '../src/simplify';
import fit2geo from '../src/index';

// const fitFile = './assets/6829812928_ACTIVITY.fit';
const fitFile = './assets/7147163106_ACTIVITY.fit';

describe('fit2geo', () => {

  it('should be able to parse a FIT file', async function() {
    this.timeout(10000);
    const fitData:ArrayBuffer = readFileSync(fitFile);
    return parseFit(fitData);
  });

  // xit('should measure simplify', async function() {
  //   this.timeout(10000);
  //   const fitData:ArrayBuffer = readFileSync(fitFile);
  //   const result = await fit2geo(fitData);
  //   const { records } = await parseFit(fitData);
  //   const resultSimplified = simplify(records);
  //   // @ts-ignore
  //   console.log(JSON.stringify(result.geometry.coordinates.reduce((a, v) => a += v.length, 0)));
  //   // console.log(JSON.stringify(resultSimplified.geometry.coordinates.reduce((a, v) => a += v.length, 0)));
  //   // @ts-ignore
  //   console.log(JSON.stringify(resultSimplified.features.length));
  //   // @ts-ignore
  //   // console.log(JSON.stringify(resultSimplified.geometry.coordinates.reduce((a, v) => a += v.length, 0)));
  //   // 7204
  // });

  it('should log result', async function() {
    this.timeout(10000);
    const fitData:ArrayBuffer = readFileSync(fitFile);
    const result = await fit2geo(fitData);
    console.log(JSON.stringify(result));
  });

});
