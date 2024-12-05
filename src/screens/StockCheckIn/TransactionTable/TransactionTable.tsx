import Table from 'component/Table/Table.tsx';
import {useOutletContext} from 'react-router-dom';
import {getTransactionRowId} from 'utilities/getTransactionRowId.ts';
import {transactionColDef} from 'utilities/TransactionColDef/TransactionColDef.tsx';
import {StockCheckInContext} from '../propTypes/types.ts';
import './TransactionTable.scss';
function TransactionTable() {
  const {transactionArr} = useOutletContext<StockCheckInContext>();

  return (
    <>
      <Table
        noOfRows={5}
        showMenu={false}
        rows={transactionArr}
        columns={transactionColDef}
        getRowId={getTransactionRowId}
        showLoading={false}
        minHeight={480}
      />
    </>
  );
}

export default TransactionTable;

