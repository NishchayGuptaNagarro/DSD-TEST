import {DriverSelectionGridProps} from 'component/DriverSelectionGrid/propTypes/types.ts';
import {Driver} from 'models/driver.ts';
import {Dispatch, SetStateAction} from 'react';
import {driverTypes} from 'models/driverTypes.ts';
import {AdminSignatureProps} from '../AdminSignature/propTypes/types.ts';
import {TransactionHistory} from '../TransactionTable/propTypes/types.ts';
import {Stock} from '../StockTable/propTypes/types.ts';
import {Attachment} from '../AttachmentTable/propTypes/types.ts';

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

export interface DriverHistoryResponse {
  status_code: number;
  msg?: string;
  data: {
    orders: OrdersResponse[];
    stocks: StocksResponse[];
    attachments: AttachmentsResponse[];
  };
}
interface OrdersResponse {
  user_id: string;
  order_number: string;
  customer: {
    role_code_text: string;
    external_id: string;
    party_id: string;
    customer_name: string;
    country: string;
    mobile: string;
    customer_longitude: number;
    creation_date: string;
    role_code: string;
    account_id: string;
    life_cycle_status_code: string;
    customer_address: string;
    phone: string;
    customer_latitude: number;
    updated_at: string;
  };
  gross_amount: number;
  curr_iso: string;
  payment_method: {
    cash: number;
    cheque: number;
    cheque_id: string;
    credit: number;
  };
}
interface StocksResponse {
  initial_stock: string;
  id: number;
  remaining_stock: string;
  updated_at: string;
  user_id: string;
  product_id: string;
  creation_date: string;
}

interface AttachmentsResponse {
  attachment: string;
  id: number;
  updated_at: string;
  creation_date: string;
  user_id: string;
  description: string;
}
