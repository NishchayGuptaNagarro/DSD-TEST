// Generic driver interface

import {DriverSignatureProps} from '../DriverSignature/propTypes/types.ts';
import {Driver} from 'models/driver.ts';
import {Dispatch, SetStateAction} from 'react';
import {Row} from 'component/Table/propTypes/types.ts';
import {DriverSelectionGridProps} from 'component/DriverSelectionGrid/propTypes/types.ts';
import {driverTypes} from 'models/driverTypes.ts';
import {OutletTableProps} from 'models/outletTableProps.ts';

// Interface for outlet context provider
export interface StockCheckOutContext
  extends DriverSelectionGridProps,
    OutletTableProps,
    DriverSignatureProps {}
// Interface for driver api response
interface ApiDriverData {
  username: string;
  business_role_id: driverTypes;
  user_id: string;
  business_partner_id: string;
  creation_date: string;
  territory: string | null; // Assuming territory can be a string or null
  employee_id: string;
  email: string;
  is_active: boolean;
  date_joined: string;
  updated_at: string;
}
export interface DriverApiResponse {
  status_code: number;
  msg?: string;
  data: ApiDriverData[];
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
  img: ApiProductImage;
}

interface ApiProductImage {
  mime_type: string | null;
  updated_at: string;
  product_image: string;
  product_id: string;
  creation_date: string;
}

export interface ProductApiResponse {
  status_code: number;
  data: ApiProductData[];
}

export interface SelectDriverStates {
  driverArray: Driver[];
  setDriverArray: Dispatch<SetStateAction<Driver[]>>;
  rows: Row[];
  setRows: Dispatch<SetStateAction<Row[]>>;
  selectedDriver: string;
  setSelectedDriver: Dispatch<SetStateAction<string>>;
  isDriverGridLoading: boolean;
  setIsDriverGridLoading: Dispatch<SetStateAction<boolean>>;
  isSignatureLoaded: boolean;
  setIsSignatureLoaded: Dispatch<SetStateAction<boolean>>;
  alertText: string;
  setAlertText: Dispatch<SetStateAction<string>>;
  alertOpen: boolean;
  setAlertOpen: Dispatch<SetStateAction<boolean>>;
  nextDisabled: boolean;
  setNextDisabled: Dispatch<SetStateAction<boolean>>;
  driverType: driverTypes;
  setDriverType: Dispatch<SetStateAction<driverTypes>>;
}
