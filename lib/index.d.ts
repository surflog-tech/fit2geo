/// <reference path="../src/modules.d.ts" />
declare function handler(buffer: ArrayBuffer): Promise<import("geojson").GeoJSON>;
export default handler;
