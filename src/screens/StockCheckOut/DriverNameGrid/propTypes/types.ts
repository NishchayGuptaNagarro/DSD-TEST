import {ChangeEvent, MouseEvent} from 'react';
import {Driver} from 'models/driver.ts';

// Prop types of DriverNameGrid component
export interface DriverNameGridProps {
  isDriverGridLoading: boolean;
  driverArray: Driver[];
  selectedDriverId: string;
  handleDriverSelection:
    | ((event: ChangeEvent<HTMLInputElement>) => void)
    | (() => void);

  driverType: 'VAN-SELLER' | 'DELIVERY' | 'HYBRID';
  handleTypeChange: (type: 'VAN-SELLER' | 'DELIVERY' | 'HYBRID') => void;
}

// Props for Driver Name Grid Header
export interface DriverNameGridHeaderProps {
  driverType: 'VAN-SELLER' | 'DELIVERY' | 'HYBRID';
  handleDriverTypeChange: (
    _: MouseEvent<HTMLElement>,
    value: 'VAN-SELLER' | 'DELIVERY' | 'HYBRID',
  ) => void;
  searchDriver: (searchText: string) => void;
}
