import {Row} from 'component/Table/propTypes/types.ts';

export function getStockRowId(row: Row) {
  if (typeof row.stockId === 'number') {
    return row.stockId;
  } else {
    throw new Error('row id should be number');
  }
}
