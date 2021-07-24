import { GeoJSON, Feature } from 'geojson';
import { Record } from './index.d';
import { featureCollection as turfFeatureCollection, point as turfPoint } from '@turf/helpers';
// import turfSimplify from '@turf/simplify';
// import { coordEach } from '@turf/meta';

// const optionsSimplify = {
//   tolerance: 0,
//   highQuality: true,
//   mutate: false,
// };


// function simplify(geojson: GeoJSON): GeoJSON {
//   let previousValue;
//   // @ts-ignore
//   coordEach(geojson, (currentCoord, coordIndex) => {
//     console.log(previousValue);
//     previousValue = currentCoord;
//     const [lng1, lat1, alt1] = currentCoord;
//     return currentCoord;
//   });

//   // const { features: [{ geometry }] } = geojson;
//   // if (geometry.type !== 'LineString') return geojson;
//   // geometry.coordinates = geometry.coordinates.filter((coordinate, index, a) => {
//   //   if (index === 0) return true;
//   //   const [lng1, lat1, alt1] = coordinate;
//   //   const [lng2, lat2, alt2] = a[index - 1];
//   //   return lng1 !== lng2 || lat1 !== lat2 || alt1 !== alt2;
//   // });
//   // return geojson;
// }

function recordFilter({ position_long, position_lat }: Record): boolean {
  return [position_long, position_lat].some((val) => val === undefined || Number.isNaN(val)) === false;
}

function recordToFeature(record: Record): Feature {
  const { position_long, position_lat, altitude, elapsed_time, timer_time, timestamp, speed, distance } = record;
  const props = {
    elapsed_time,
    timer_time,
    timestamp,
    speed,
    distance,
  };
  return turfPoint([position_long, position_lat, altitude], props);
}

function simplify(records: Record[]): GeoJSON {
  const recordsFiltered = records.filter(recordFilter);
  // // @ts-ignore
  // return turfSimplify(turfFeatureCollection(recordsFiltered.map(recordToFeature)), optionsSimplify);
  return turfFeatureCollection(recordsFiltered.map(recordToFeature));
}

export default simplify;
