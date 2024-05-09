import {DriverSelectionGridProps} from 'component/DriverSelectionGrid/propTypes/types.ts';
import {Driver} from '../../../models/driver.ts';
import {Dispatch, SetStateAction} from 'react';
import {driverTypes} from 'models/driverTypes.ts';
import {OutletTableProps} from 'models/outletTableProps.ts';
import {Row} from '../../../component/Table/propTypes/types.ts';
import {AdminSignatureProps} from '../AdminSignature/propTypes/types.ts';

export interface StockCheckInContext
  extends DriverSelectionGridProps,
    OutletTableProps,
    AdminSignatureProps {}

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
  rows: Row[];
  setRows: Dispatch<SetStateAction<Row[]>>;
  isSignatureDone: boolean;
  setIsSignatureDone: Dispatch<SetStateAction<boolean>>;
}
