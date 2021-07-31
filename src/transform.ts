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

function parameterFilter(records: Record[], multiLine: MultiLineString): Record[] {
  const coords = coordAll(multiLine);
  console.log(coords.length);
  if (coords.length === 0) return [];
  let coordIndex = 0;
  return records.filter(({ position_long, position_lat }) => {
    const recordInvalid = [position_long, position_lat].some((val) => val === undefined || Number.isNaN(val)) === true;
    if (recordInvalid === true) return false;
    const match = [position_long, position_lat].every((coord, index) => coord === coords[coordIndex][index]);
    if (match === false) return false;
    coordIndex += 1;
    return true;
  });
}

function transform(records: Record[]): GeoJSON {
  const multiline = turfMultiLineString(records.reduce(reducer, [[]]));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
  const simplified = turfSimplify(multiline, simplifyOptions);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const coordsMeta: GeoJsonProperties = parameterFilter(records, simplified).map((record) => ({
    ...record,
    time: dateToTimestamp(record.timestamp),
  }));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  simplified.properties = { coordsMeta };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return simplified;
}

export default transform;
