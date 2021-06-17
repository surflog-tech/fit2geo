"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function recordTimestampToISOString({ timestamp }) {
    return timestamp.toISOString();
}
function record({ position_long, position_lat, altitude }) {
    return [position_long, position_lat, altitude];
}
function transform(records = []) {
    const coordinates = records.map(record);
    const coordTimes = records.map(recordTimestampToISOString);
    const [time] = coordTimes;
    return {
        type: 'FeatureCollection',
        features: [{
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates,
                },
                properties: {
                    time,
                    coordTimes,
                },
            }],
    };
}
exports.default = transform;
