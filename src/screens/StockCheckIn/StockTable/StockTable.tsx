import Table from 'component/Table/Table.tsx';
import {useOutletContext} from 'react-router-dom';
import {getStockRowId} from 'utilities/getStockRowId.ts';
import {stockColDef} from 'utilities/StockColDef/StockColDef.tsx';
import {StockCheckInContext} from '../propTypes/types.ts';

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
        minHeight={344}
      />
    </>
  );
}

export default StockTable;

