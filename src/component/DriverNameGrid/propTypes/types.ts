import {Driver} from '../../../screens/SelectDriver/propTypes/types.ts';
import {ChangeEvent} from 'react';

// Prop types of DriverNameGrid component
export interface DriverNameGridProps {
  driverArray: Driver[];
  selectedDriverId: string;
  handleDriverSelection:
    | ((event: ChangeEvent<HTMLInputElement>) => void)
    | (() => void);
}
