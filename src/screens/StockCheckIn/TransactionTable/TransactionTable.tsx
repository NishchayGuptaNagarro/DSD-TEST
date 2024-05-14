import Table from 'component/Table/Table.tsx';
import {useOutletContext} from 'react-router-dom';
import {StockCheckInContext} from '../propTypes/types.ts';
import {transactionColDef} from './TransactionColDef/TransactionColDef.tsx';
import {Row} from 'component/Table/propTypes/types.ts';

import './TransactionTable.scss';
function TransactionTable() {
  const {transactionArr} = useOutletContext<StockCheckInContext>();

  function getTransactionRowId(row: Row) {
    if (typeof row.orderId === 'number') {
      return row.orderId;
    } else {
      throw new Error('row id should be number');
    }
  }

  return (
    <>
      <Table
        rows={transactionArr}
        columns={transactionColDef}
        getRowId={getTransactionRowId}
        showLoading={false}
      />
    </>
  );
}

export default TransactionTable;
