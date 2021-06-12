/// <reference path="../src/fit-file-parser.d.ts" />
import { GeoJSON } from 'geojson';
declare function handler(buffer: ArrayBuffer): Promise<GeoJSON>;
export default handler;
