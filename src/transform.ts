import { Feature, LineString, Position } from 'geojson';
import { featureCollection, lineString, isNumber } from '@turf/helpers';
import bbox from '@turf/bbox';
import { Fit, Record, SurflogFeatureCollection } from './index.d';

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
  if (records.length === 1) {
    return [records[index], records[index]];
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

function detectSport(sports: Fit['sports'], sessions: Fit['sessions']) {
  if (Array.isArray(sports) && sports.length > 0) return sports[0];
  if (Array.isArray(sessions) && sessions.length > 0) {
    return {
      name: sessions[0].sport
    };
  }
}

function transform({records, sports, sessions}: Fit) {
  const lineStringFeatures: SurflogFeatureCollection = featureCollection(records.reduce(makeLineStringFeature, []));
  lineStringFeatures.bbox = bbox(lineStringFeatures);
  if (lineStringFeatures.properties === undefined) lineStringFeatures.properties = {};
  lineStringFeatures.properties.sport = detectSport(sports, sessions);
  return lineStringFeatures;
}

export default transform;
