import {DriverSelectionGridProps} from 'component/DriverSelectionGrid/propTypes/types.ts';
import {Driver} from 'models/Driver.ts';
import {Dispatch, SetStateAction} from 'react';
import {driverTypes} from 'models/driverTypes.ts';
import {AdminSignatureProps} from '../AdminSignature/propTypes/types.ts';

import {Attachment} from 'models/Attachment.ts';
import {Stock} from 'models/Stock.ts';
import {TransactionHistory} from 'models/TransactionHistory.ts';

export interface StockCheckInContext
  extends DriverSelectionGridProps,
    AdminSignatureProps {
  transactionArr: TransactionHistory[];
  stockArr: Stock[];
  attachmentArr: Attachment[];
}

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
  isSignatureDone: boolean;
  setIsSignatureDone: Dispatch<SetStateAction<boolean>>;
  signatureURL: string;
  setSignatureURL: Dispatch<SetStateAction<string>>;
  alertOpen: boolean;
  setAlertOpen: Dispatch<SetStateAction<boolean>>;
}
export interface PendingCheckInResponse {
  status_code: number;
  msg?: string;
  data: PendingDriver[];
}

export interface PendingDriver {
  user_id: string;
  business_role_id: driverTypes;
  employee_id: string;
  is_active: boolean;
  device_token: string;
  creation_date: string;
  updated_at: string;
  email: string;
  username: string;
  business_partner_id: string;
  van_id: string;
  date_joined: string;
}
