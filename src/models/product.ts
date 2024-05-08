import {Row} from 'component/Table/propTypes/types.ts';
export interface Product extends Row {
  productId: number;
  externalId: string;
  name: string;
  description: string;
  imageSrc: string;
  initialStock: number;
  uom: string;
  quantity: number;
}
