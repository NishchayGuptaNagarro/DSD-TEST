import {DriverSelectionGridProps} from 'component/DriverSelectionGrid/propTypes/types.ts';
import {Driver} from '../../../models/driver.ts';
import {Dispatch, SetStateAction} from 'react';
import {driverTypes} from 'models/driverTypes.ts';

export interface StockCheckInContext extends DriverSelectionGridProps {}

export interface StockCheckInStates {
  nextDisabled: boolean;
  setNextDisabled: Dispatch<SetStateAction<boolean>>;
  isDriverGridLoading: boolean;
  setIsDriverGridLoading: Dispatch<SetStateAction<boolean>>;
  driverArray: Driver[];
  setDriverArray: Dispatch<SetStateAction<Driver[]>>;
  selectedDriver: string;
  setSelectedDriver: Dispatch<SetStateAction<string>>;
  driverType: driverTypes;
  setDriverType: Dispatch<SetStateAction<driverTypes>>;
}
