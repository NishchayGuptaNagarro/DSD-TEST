import {Row} from 'component/Table/propTypes/types.ts';

export function getProductRowId(row: Row) {
  if (typeof row.productId === 'number' || typeof row.productId === 'string') {
    return row.productId;
  } else {
    throw new Error('row id should be number or string');
  }
}
