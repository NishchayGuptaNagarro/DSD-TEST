import {Row} from 'component/Table/propTypes/types';

export interface AllDriverHistoryResponse {
  status_code: number;
  msg?: string;
  data: SingleDriverHistoryResponse[];
}

export interface SingleDriverHistoryResponse {
  date: string;
  user_id: string;
  orders: OrdersResponse[];
  stocks: StocksResponse[];
  attachments: AttachmentsResponse[];
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
export interface OrdersResponse extends Row {
  user_id: string;
  order_number: string;
  status: string;
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
  complete_date: string;
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

