import {driverTypes} from 'models/driverTypes.ts';

export interface Driver {
  driverName: string;
  driverId: string;
  driverType: driverTypes;
}
