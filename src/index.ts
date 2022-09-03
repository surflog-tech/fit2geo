import { FeatureCollection } from 'geojson';
import parseFit from './parse';
import transform from './transform';

async function handler(buffer: ArrayBuffer): Promise<FeatureCollection> {
  const { records, sports } = await parseFit(buffer);
  return transform(records, sports);
}

export default handler;
