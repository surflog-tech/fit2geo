import { FeatureCollection } from 'geojson';
import parseFit from './parse';
import transform from './transform';

async function handler(buffer: ArrayBuffer): Promise<FeatureCollection> {
  const { records } = await parseFit(buffer);
  return transform(records);
}

export default handler;
