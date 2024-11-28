import {Driver} from 'models/Driver.ts';
import {driverTypes} from 'models/driverTypes.ts';
import {MouseEvent} from 'react';

export interface DriverSelectionGridProps {
  isDriverGridLoading: boolean;
  driverArray: Driver[];
  handleDriverSelection: ((driverId: string) => void) | (() => void);
  driverType: driverTypes;
  handleTypeChange: (type: driverTypes) => void;
}
// Props for Driver Name Grid Header
export interface DriverNameGridHeaderProps {
  driverType: driverTypes;
  handleDriverTypeChange: (
    _: MouseEvent<HTMLElement>,
    value: driverTypes,
  ) => void;
  searchDriver: (searchText: string) => void;
}

