import {Row} from 'component/Table/propTypes/types.ts';
import {OrdersResponse} from 'models/DriverHistoryResponse';

export interface Order extends Row {
  orderId: number;
  customerId: number;
  name: string;
}

export interface OrderInfoButtonProps {
  orderInfo: OrdersResponse[];
  handleOrderInfoClick: (orderInfo: OrdersResponse[]) => void;
}

export interface MyOrderInfoButtonProps {
  orderId: number | string;
  handleOrderInfoClick: (orderId: string | number) => void;
}

