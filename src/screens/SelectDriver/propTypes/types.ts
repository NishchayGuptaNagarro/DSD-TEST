// Generic driver interface
import {DriverNameGridProps} from '../../../component/DriverNameGrid/propTypes/types.ts';
import {TableProps} from '../../../component/Table/propTypes/types.ts';

export interface Driver {
  driverName: string;
  driverId: string;
  driverType: 'vanSeller' | 'delivery' | 'hybrid';
}

// Interface for screen outlet context provider
export interface DriverOutletContext extends DriverNameGridProps, TableProps {}
