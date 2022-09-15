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

interface Session {
  sport?: string;
}

export interface Fit {
  records: Array<Record>;
  sports: Array<Sport>;
  sessions: Array<Session>
}

export interface Sport {
  name?: string;
  sport?: string;
  sub_sport?: string;
}

export interface SurflogFeatureCollection extends FeatureCollection {
  properties?: {
    sport?: Sport
  };
}
