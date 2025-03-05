// Generic driver interface

import {DriverSignatureProps} from '../DriverSignature/propTypes/types.ts';
import {Drivers} from 'models/Driver.ts';
import {Dispatch, SetStateAction} from 'react';
import {Row} from 'component/Table/propTypes/types.ts';
import {DriverSelectionGridProps} from 'component/DriverSelectionGrid/propTypes/types.ts';
import {driverTypes} from 'models/driverTypes.ts';
import {OutletTableProps} from 'models/OutletTableProps.ts';


// Interface for outlet context provider
export interface StockCheckOutContext
  extends DriverSelectionGridProps,
    OutletTableProps,
    DriverSignatureProps {}
// Interface for driver api response
interface ApiDriverData {
  username: string;
  business_role_id: 'VAN-SELLER' | 'DELIVERY'; // Role-specific field
  user_id: string;
  business_partner_id: string;
  van_id: string | null;
  creation_date: string | null;
  employee_id: string;
  email: string;
  is_active: boolean;
  device_token: string | null;
  updated_at: string;
}
export interface DriverApiResponse {
  status_code: number;
  msg?: string;
  data: {
    'VAN-SELLER': ApiDriverData[];
    'DELIVERY': ApiDriverData[];
    'HYBRID': ApiDriverData[];
  };
}

//Interfaces for product API response
interface ApiProductData {
  product_id: string;
  product_name: string;
  status: string;
  creation_date: string;
  unit_of_measure: string;
  description: string;
  external_id: string;
  category_id: string;
  updated_at: string;
  quantity: number;
  img: string;
}


export interface ProductApiResponse {
  status_code: number;
  data: ApiProductData[];
}

export interface SelectDriverStates {
  driverArray: Drivers;
  setDriverArray: Dispatch<SetStateAction<Drivers>>;
  rows: Row[];
  setRows: Dispatch<SetStateAction<Row[]>>;
  selectedDriver: string;
  setSelectedDriver: Dispatch<SetStateAction<string>>;
  isDriverGridLoading: boolean;
  setIsDriverGridLoading: Dispatch<SetStateAction<boolean>>;
  isSignatureLoaded: boolean;
  setIsSignatureLoaded: Dispatch<SetStateAction<boolean>>;
  alertOpen: boolean;
  setAlertOpen: Dispatch<SetStateAction<boolean>>;
  nextDisabled: boolean;
  setNextDisabled: Dispatch<SetStateAction<boolean>>;
  driverType: driverTypes;
  setDriverType: Dispatch<SetStateAction<driverTypes>>;
}
