import { GeoJSON, MultiLineString, GeoJsonProperties } from 'geojson';
import { multiLineString as turfMultiLineString } from '@turf/helpers';
import turfSimplify from '@turf/simplify';
import { coordAll } from '@turf/meta';
import { Record } from './index.d';

const simplifyOptions = {
  tolerance: 0,
  highQuality: true,
  mutate: true,
};

function dateToTimestamp(d: Date) {
  return d.getTime();
}

function recordInvalid(lng: number, lat: number) {
  return [lng, lat].some((val) => typeof val !== 'number');
}

function reducer(accumulator: number[][][], currentValue: Record, index: number, array: Record[]) {
  const { position_long, position_lat, altitude, elapsed_time, timer_time } = currentValue;
  if (recordInvalid(position_long, position_lat)) return accumulator;
  if (index > 0) {
    const prevValue = array[index - 1];
    const diffPrev = prevValue.elapsed_time - prevValue.timer_time;
    const diff = elapsed_time - timer_time;
    if (diffPrev !== diff) accumulator.push([]);
  }
  const lastLine = accumulator[accumulator.length - 1];
  if (typeof altitude === 'number') {
    lastLine.push([position_long, position_lat, altitude]);
  } else {
    lastLine.push([position_long, position_lat]);
  }
  return accumulator;
}

function parameterFilter(records: Record[], multiline: MultiLineString): Record[] {
  const coords = coordAll(multiline);
  if (coords.length === 0) return [];
  let coordIndex = 0;
  return records.filter(({ position_long, position_lat }) => {
    if (coords[coordIndex] === undefined) return false;
    if (recordInvalid(position_long, position_lat)) return false;
    const match = [position_long, position_lat].every((coord, index) => coord === coords[coordIndex][index]);
    if (match === false) return false;
    coordIndex += 1;
    return true;
  });
}

function transform(records: Record[]): GeoJSON {
  const multiline = turfSimplify(turfMultiLineString(records.reduce(reducer, [[]])), simplifyOptions);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const coordsMeta: GeoJsonProperties = parameterFilter(records, multiline)
    .map((record) => ({
      ...record,
      time: dateToTimestamp(record.timestamp),
    }));
  multiline.properties = { coordsMeta };
  return multiline;
}

export default transform;
