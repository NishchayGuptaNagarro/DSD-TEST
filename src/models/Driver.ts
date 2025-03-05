import {driverTypes} from 'models/driverTypes.ts';


export interface Driver {
  driverName: string;
  driverId: string;
  driverType: driverTypes;
}
export interface Drivers {
    'VAN-SELLER': Driver[];
    'DELIVERY': Driver[];
    'HYBRID': Driver[];
}
