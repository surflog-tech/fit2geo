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
  timestamp: Date;
}

export interface Fit {
  records: Array<Record>;
}
