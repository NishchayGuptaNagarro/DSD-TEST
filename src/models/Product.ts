import {Row} from 'component/Table/propTypes/types.ts';
export interface Product extends Row {
  productId: number|string;
  externalId: string;
  name: string;
  description: string;
  imageSrc: string;
  uom: string;
  quantity: number;
}

export interface MyOrderDetailProduct extends Row {
  productId: number | string;
  description: string;
  imageSrc: string;
  uom: string;
  quantity: number;
}