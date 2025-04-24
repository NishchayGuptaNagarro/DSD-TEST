import {Row} from 'component/Table/propTypes/types.ts';

export interface TransactionHistory extends Row {
  // Used to van-seller transaction history data
  rowId: number;
  orderId: string;
  customerId: number;
  customerName: string;
  grossAmount: number;
  currIso: string;
  paymentMethods: PaymentMethods;
  status: string;
}

export interface DeliveryTransactionHistory extends Row {
  // Used to delivery transaction history data
  rowId: number;
  customerId: number | string;
  orders: TransactionHistory[];
}

export interface PaymentMethods {
  cash?: number;
  cheque?: number;
  credit?: number;
}
export interface PaymentGridProps {
  paymentMethods: PaymentMethods;
}

