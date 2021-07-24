import { GeoJSON, GeoJsonProperties } from 'geojson';
import { multiLineString as turfMultiLineString } from '@turf/helpers';
import { Record } from './index.d';

function dateToTimestamp(d: Date) {
  return d.getTime();
}

function recordFilter({ position_long, position_lat }: Record): boolean {
  return [position_long, position_lat].some((val) => val === undefined || Number.isNaN(val)) === false;
}

function recordMeta({ timestamp, speed, distance }: Record): GeoJsonProperties {
  return {
    time: dateToTimestamp(timestamp),
    speed,
    distance,
  };
}

function reducer(accumulator: number[][][], currentValue: Record, index: number, array: Record[]) {
  const { position_long, position_lat, altitude, elapsed_time, timer_time } = currentValue;
  if (index > 0) {
    const prevValue = array[index - 1];
    const diffPrev = prevValue.elapsed_time - prevValue.timer_time;
    const diff = elapsed_time - timer_time;
    if (diffPrev !== diff) accumulator.push([]);
  }
  const lastLine = accumulator[accumulator.length - 1];
  lastLine.push([position_long, position_lat, altitude]);
  return accumulator;
}

function transform(records: Record[]): GeoJSON {
  const recordsFiltered = records.filter(recordFilter);
  const coordsMeta = recordsFiltered.map(recordMeta);
  const props = { coordsMeta };
  return turfMultiLineString(recordsFiltered.reduce(reducer, [[]]), props);
}

export default transform;
