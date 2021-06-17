import { FeatureCollection, Position } from 'geojson';
import { Record } from './index.d';

function recordTimestampToISOString({ timestamp }: Record) {
  return timestamp.toISOString();
}

function record({ position_long, position_lat, altitude }: Record): Position {
  return [position_long, position_lat, altitude];
}

function transform(records: Record[] = []): FeatureCollection {
  const coordinates:Position[] = records.map(record);
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

export default transform;
