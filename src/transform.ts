import { FeatureCollection, Feature, LineString, Position } from 'geojson';
import { featureCollection, lineString, isNumber } from '@turf/helpers';
import bbox from '@turf/bbox';
import { Record } from './index.d';

function areRecordsValid(records: Record[]) {
  return records.every(({ position_long, position_lat }) => [position_long, position_lat].every(isNumber));
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

function makeLineStringFeature(accumulator: Feature<LineString, Record>[], currentValue: Record, index: number, records: Record[]) {
  const [record1, record2] = getRecords(records, index);
  if (areRecordsValid([record1, record2])) {
    accumulator.push(lineString([getPosition(record1), getPosition(record2)], currentValue));
  }
  return accumulator;
}

function transform(records: Record[]): FeatureCollection {
  const lineStringFeatures = featureCollection(records.reduce(makeLineStringFeature, []));
  lineStringFeatures.bbox = bbox(lineStringFeatures);
  return lineStringFeatures;
}

export default transform;
