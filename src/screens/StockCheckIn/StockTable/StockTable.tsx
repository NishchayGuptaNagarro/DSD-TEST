import Table from 'component/Table/Table.tsx';
import {useOutletContext} from 'react-router-dom';
import {StockCheckInContext} from '../propTypes/types.ts';
import {Row} from 'component/Table/propTypes/types.ts';
import {stockColDef} from './StockColDef/StockColDef.tsx';

function StockTable() {
  const {stockArr} = useOutletContext<StockCheckInContext>();

  function getStockRowId(row: Row) {
    if (typeof row.stockId === 'number') {
      return row.stockId;
    } else {
      throw new Error('row id should be number');
    }
  }

  return (
    <>
      <Table
        rows={stockArr}
        getRowId={getStockRowId}
        showLoading={false}
        columns={stockColDef}
      />
    </>
  );
}

export default StockTable;
