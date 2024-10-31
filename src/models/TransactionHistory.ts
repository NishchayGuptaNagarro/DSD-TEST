import {Row} from 'component/Table/propTypes/types.ts';

export interface TransactionHistory extends Row {
  orderId: number;
  customerId: number;
  customerName: string;
  grossAmount: number;
  paymentMethods: PaymentMethods;
}

export interface PaymentMethods {
  cash?: number;
  cheque?: number;
  credit?: number;
}
export interface PaymentGridProps {
  paymentMethods: PaymentMethods;
}

