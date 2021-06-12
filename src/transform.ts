import { GeoJSON, Position } from 'geojson';
import { Record } from './index.d';

function transform(records: Record[] = []): GeoJSON {
  const coordinates:Position[] = records.map(({ position_long, position_lat }) => [position_long, position_lat]);
  const featureCollection: GeoJSON = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates,
      },
      properties: {},
    }],
  };
  return featureCollection;
}

export default transform;
