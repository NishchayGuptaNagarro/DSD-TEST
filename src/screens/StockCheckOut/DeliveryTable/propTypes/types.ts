import {Row} from 'component/Table/propTypes/types.ts';
import {Product} from 'models/Product.ts';

export interface DeliveryTableRow extends Row {
  orderId: number;
  orderDescription: string;
  customerId: number;
  customerName: string;
  products: Product[];
}

export interface ProductsButtonProps {
  products: Product[];
  handleClick: (products: Product[]) => void;
}
