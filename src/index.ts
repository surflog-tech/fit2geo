import { FeatureCollection } from 'geojson';
import parseFit from './parse';
import transform from './transform';

async function handler(buffer: ArrayBuffer): Promise<FeatureCollection> {
  return parseFit(buffer).then(transform);
}

export default handler;
