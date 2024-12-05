import {Driver} from 'models/Driver.ts';

// Props for driver card component
export interface DriverCardProps {
  driver: Driver;
  selectedDriverId: string;
  dataLoading: boolean;
  handleDriverSelection: ((driverId: string) => void) | (() => void);
}

