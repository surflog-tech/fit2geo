"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function record({ position_long, position_lat, altitude }) {
    return [position_long, position_lat, altitude];
}
function transform(records = []) {
    const coordinates = records.map(record);
    const [{ timestamp: time }] = records;
    const featureCollection = {
        type: 'FeatureCollection',
        features: [{
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates,
                },
                properties: { time },
            }],
    };
    return featureCollection;
}
exports.default = transform;
