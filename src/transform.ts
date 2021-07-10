import { FeatureCollection, Position } from 'geojson';
import { Record } from './index.d';

function recordTimestampToISOString({ timestamp }: Record) {
  return timestamp.toISOString();
}

function recordFilter({ position_long, position_lat }: Record): boolean {
  return [position_long, position_lat].some((val) => val === undefined || Number.isNaN(val)) === false;
}

function record({ position_long, position_lat, altitude }: Record): Position {
  return [position_long, position_lat, altitude];
}

function transform(records: Record[] = []): FeatureCollection {
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

export default transform;
