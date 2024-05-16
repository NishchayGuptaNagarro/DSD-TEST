import {Driver} from 'models/Driver.ts';
import {ChangeEvent, MouseEvent} from 'react';
import {driverTypes} from 'models/driverTypes.ts';

export interface DriverSelectionGridProps {
  isDriverGridLoading: boolean;
  driverArray: Driver[];
  selectedDriverId: string;
  handleDriverSelection:
    | ((event: ChangeEvent<HTMLInputElement>) => void)
    | (() => void);

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
