import {Row} from 'component/Table/propTypes/types.ts';

export interface Order extends Row {
    orderId: number;
    customerId: number;
    name: string;
}