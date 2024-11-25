import {Row} from 'component/Table/propTypes/types.ts';

export function getTransactionRowId(row: Row) {
  if (typeof row.rowId === 'number') {
    return row.rowId;
  } else {
    throw new Error('row id should be number');
  }
}

