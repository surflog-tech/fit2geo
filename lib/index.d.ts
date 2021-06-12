/// <reference path="../src/fit-file-parser.d.ts" />
import { FeatureCollection } from 'geojson';
declare function handler(buffer: ArrayBuffer): Promise<FeatureCollection>;
export default handler;
