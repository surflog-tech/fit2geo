export interface Record {
  timestamp: string;
  position_lat: number;
  position_long: number;
  distance: number;
  accumulated_power: number;
  altitude: number;
  speed: number;
  heart_rate: number;
  cadence: number;
  fractional_cadence: number;
}

export interface Fit {
  records: Array<Record>;
}

export type NullOrError = null | Error;
