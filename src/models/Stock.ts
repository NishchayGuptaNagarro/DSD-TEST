import {Row} from 'component/Table/propTypes/types.ts';

export interface Stock extends Row {
  stockId: number;
  item: string;
  initial: number;
  remaining: number;
}
