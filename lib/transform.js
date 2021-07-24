"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@turf/helpers");
function dateToTimestamp(d) {
    return d.getTime();
}
function recordFilter({ position_long, position_lat }) {
    return [position_long, position_lat].some((val) => val === undefined || Number.isNaN(val)) === false;
}
function recordMeta({ timestamp, speed }) {
    return {
        time: dateToTimestamp(timestamp),
        speed,
    };
}
function reducer(accumulator, currentValue, index, array) {
    const { position_long, position_lat, altitude, elapsed_time, timer_time } = currentValue;
    if (index > 0) {
        const prevValue = array[index - 1];
        const diffPrev = prevValue.elapsed_time - prevValue.timer_time;
        const diff = elapsed_time - timer_time;
        if (diffPrev !== diff)
            accumulator.push([]);
    }
    const lastLine = accumulator[accumulator.length - 1];
    lastLine.push([position_long, position_lat, altitude]);
    return accumulator;
}
function transform(records) {
    const recordsFiltered = records.filter(recordFilter);
    const coordsMeta = recordsFiltered.map(recordMeta);
    const props = { coordsMeta };
    return helpers_1.multiLineString(recordsFiltered.reduce(reducer, [[]]), props);
}
exports.default = transform;
