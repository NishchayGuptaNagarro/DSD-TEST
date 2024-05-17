import {useOutletContext} from 'react-router-dom';
import Table from 'component/Table/Table.tsx';
import {stockColDef} from 'utilities/StockColDef/StockColDef.tsx';
import {StockCheckInContext} from '../propTypes/types.ts';
import {getStockRowId} from 'utilities/getStockRowId.ts';

function StockTable() {
  const {stockArr} = useOutletContext<StockCheckInContext>();

  return (
    <>
      <Table
        noOfRows={5}
        showMenu={false}
        rows={stockArr}
        getRowId={getStockRowId}
        showLoading={false}
        columns={stockColDef}
      />
    </>
  );
}

export default StockTable;
