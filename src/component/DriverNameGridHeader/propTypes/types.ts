import {driverTypes} from 'models/driverTypes.ts';
import {MouseEvent} from 'react';
export interface DriverNameGridHeaderProps {
  driverType: driverTypes;
  handleDriverTypeChange: (
    _: MouseEvent<HTMLElement>,
    value: driverTypes,
  ) => void;
  searchDriver: (searchText: string) => void;
  showDriverTypeHeader?: boolean;
}
