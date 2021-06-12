import { readFileSync } from 'fs';
import fit2geo from './index';

// const [,,fitFile] = process.argv;
const fitFile = './assets/6829812928_ACTIVITY.fit';

describe('fit2geo', () => {
  it('should be able to parse a FIT file', async () => {
    const fitData:ArrayBuffer = readFileSync(fitFile);
    return fit2geo(fitData);
    // const result = await fit2geo(fitData);
    // const { features: [f] } = result;
    // console.log(f);
  });
});
