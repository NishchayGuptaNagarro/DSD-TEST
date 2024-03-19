import {Row} from '../../../component/Table/propTypes/types.ts';

export interface Product extends Row {
	productId: number;
	name: string;
	imageSrc: string;
	description: string;
	quantity: number;
}
