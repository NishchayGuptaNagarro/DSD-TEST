import {Row} from 'component/Table/propTypes/types.ts';

export interface TransactionHistory extends Row {
  rowId: number;
  orderId: string;
  customerId: number;
  customerName: string;
  grossAmount: number;
  currIso: string;
  paymentMethods: PaymentMethods;
  status: string;
}

export interface PaymentMethods {
  cash?: number;
  cheque?: number;
  credit?: number;
}
export interface PaymentGridProps {
  paymentMethods: PaymentMethods;
}

