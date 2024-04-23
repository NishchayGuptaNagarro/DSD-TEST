import {Driver} from '../../../../../models/driver.ts';

// Props for driver card component
export interface DriverCardProps {
  driver: Driver;
  selectedDriverId: string;
}
