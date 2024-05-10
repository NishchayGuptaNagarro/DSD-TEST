import Table from 'component/Table/Table.tsx';
import {useOutletContext} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {StockCheckInContext} from '../propTypes/types.ts';
import {Row} from 'component/Table/propTypes/types.ts';
import {Stock} from './propTypes/types.ts';
import {stockColDef} from './StockColDef/StockColDef.tsx';

function StockTable() {
  //MOCK DATA
  const mockData: Stock[] = [
    {
      stockId: 1,
      item: 'Product X',
      initial: 100,
      remaining: 75,
      id: 1,
    },
    {
      stockId: 2,
      item: 'Product Y',
      initial: 200,
      remaining: 150,
      id: 2,
    },
  ];
  //END OF MOCK DATA

  const {setRows, rows} = useOutletContext<StockCheckInContext>();
  const [isTableLoaded, setIsTableLoaded] = useState(false);

  function fetchRows() {
    const parsedRows: Stock[] = mockData;
    setRows(parsedRows);
    setIsTableLoaded(true);
  }
  function getStockRowId(row: Row) {
    if (typeof row.stockId === 'number') {
      return row.stockId;
    } else {
      throw new Error('row id should be number');
    }
  }
  useEffect(() => {
    fetchRows();
  }, []);

  return (
    <>
      <Table
        rows={rows}
        getRowId={getStockRowId}
        showLoading={!isTableLoaded}
        columns={stockColDef}
      />
    </>
  );
}

export default StockTable;
