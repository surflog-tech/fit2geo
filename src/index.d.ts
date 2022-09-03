import { FeatureCollection } from 'geojson';

export interface Record {
  accumulated_power: number;
  altitude: number;
  cadence: number;
  distance: number;
  elapsed_time: number;
  fractional_cadence: number;
  heart_rate: number;
  position_lat: number;
  position_long: number;
  speed: number;
  timer_time: number;
  timestamp: string;
}

export interface Fit {
  records: Array<Record>;
  sports: Array<Sport>;
}

export interface Sport {
  name: string;
  sport: string;
  sub_sport: string;
}

type JSONPrimitive = string | number | boolean | null | Sport;
type JSONValue = JSONPrimitive | JSONObject | Array<JSONValue>
type JSONObject = { [member: string]: JSONValue }

export interface SurflogFeatureCollection extends FeatureCollection {
  properties?: JSONObject;
}
