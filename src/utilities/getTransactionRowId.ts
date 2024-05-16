import {Row} from 'component/Table/propTypes/types.ts';

export function getTransactionRowId(row: Row) {
  if (typeof row.orderId === 'number') {
    return row.orderId;
  } else {
    throw new Error('row id should be number');
  }
}
