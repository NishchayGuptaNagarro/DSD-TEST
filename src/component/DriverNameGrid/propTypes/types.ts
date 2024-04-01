import {Driver} from '../../../screens/SelectDriver/propTypes/types.ts';
import {ChangeEvent, MouseEvent} from 'react';

// Prop types of DriverNameGrid component
export interface DriverNameGridProps {
  driverArray: Driver[];
  selectedDriverId: string;
  handleDriverSelection:
    | ((event: ChangeEvent<HTMLInputElement>) => void)
    | (() => void);
}

// Props for Driver Name Grid Header
export interface DriverNameGridHeaderProps {
  driverType: 'vanSeller' | 'delivery' | 'hybrid';
  handleDriverTypeChange: (
    _: MouseEvent<HTMLElement>,
    value: 'vanSeller' | 'delivery' | 'hybrid',
  ) => void;
  searchDriver: (searchText: string) => void;
}
