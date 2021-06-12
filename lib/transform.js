"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transform(records = []) {
    const coordinates = records.map(({ position_long, position_lat }) => [position_long, position_lat]);
    const featureCollection = {
        type: 'FeatureCollection',
        features: [{
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates,
                },
                properties: {},
            }],
    };
    return featureCollection;
}
exports.default = transform;
