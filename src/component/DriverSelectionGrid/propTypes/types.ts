import {Drivers} from 'models/Driver.ts';
import {driverTypes} from 'models/driverTypes.ts';
import {MouseEvent} from 'react';

export interface DriverSelectionGridProps {
  isDriverGridLoading: boolean;
  driverArray: Drivers;
  dataLoading?: boolean;
  selectedDriverId: string;
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

