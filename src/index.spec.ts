import { GeoJSON } from 'geojson';
import { readFileSync } from 'fs';
import fit2geo from './index';

// const [,,fitFile] = process.argv;
const fitFile = './assets/6829812928_ACTIVITY.fit';

describe('fit2geo', () => {
  it('should be able to parse a FIT file', async () => {
    const fitData:ArrayBuffer = readFileSync(fitFile);
    const result:GeoJSON = await fit2geo(fitData);
    // console.log(result);
  });
});
