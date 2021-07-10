"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function recordTimestampToISOString({ timestamp }) {
    return timestamp.toISOString();
}
function recordFilter({ position_long, position_lat }) {
    return [position_long, position_lat].some((val) => val === undefined || Number.isNaN(val)) === false;
}
function record({ position_long, position_lat, altitude }) {
    return [position_long, position_lat, altitude];
}
function transform(records = []) {
    const recordsFiltered = records.filter(recordFilter);
    const coordinates = recordsFiltered.map(record);
    const coordTimes = recordsFiltered.map(recordTimestampToISOString);
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
