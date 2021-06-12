import { GeoJSON, Position } from 'geojson';
import { Record } from './index.d';

function record({ position_long, position_lat, altitude }: Record): Position {
  return [position_long, position_lat, altitude];
}

function transform(records: Record[] = []): GeoJSON {
  const coordinates:Position[] = records.map(record);
  const [{ timestamp: time }] = records;
  const featureCollection: GeoJSON = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates,
      },
      properties: { time },
    }],
  };
  return featureCollection;
}

export default transform;
