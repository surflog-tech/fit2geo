import { GeoJSON, Feature, LineString, Position } from 'geojson';
import { featureCollection, lineString, isNumber } from '@turf/helpers';
import { Record } from './index.d';

function recordIsInvalid({ position_long, position_lat }: Record) {
  return [position_long, position_lat].some((val) => isNumber(val) === false);
}

function getPosition({ position_long, position_lat }: Record): Position {
  return [position_long, position_lat];
}

function getRecords(records: Record[], index: number) {
  if (index > 0) {
    return [records[index - 1], records[index]];
  }
  return [records[index], records[index + 1]];
}

function reducer(accumulator: Feature<LineString, Record>[], currentValue: Record, index: number, records: Record[]) {
  const [record1, record2] = getRecords(records, index);
  if (recordIsInvalid(record1) || recordIsInvalid(record2)) return accumulator;
  return accumulator.concat(lineString([getPosition(record1), getPosition(record2)], currentValue));
}

function transform(records: Record[]): GeoJSON {
  return featureCollection(records.reduce(reducer, []));
}

export default transform;
