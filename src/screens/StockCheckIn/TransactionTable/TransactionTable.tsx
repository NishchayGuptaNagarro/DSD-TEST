import Table from 'component/Table/Table.tsx';
import {useOutletContext} from 'react-router-dom';
import {StockCheckInContext} from '../propTypes/types.ts';
import {useEffect, useState} from 'react';
import {transactionColDef} from './TransactionColDef/TransactionColDef.tsx';
import {Row} from 'component/Table/propTypes/types.ts';
import {TransactionHistory} from './propTypes/types.ts';

import './TransactionTable.scss';
function TransactionTable() {
  //MOCK DATA
  const mockData: TransactionHistory[] = [
    {
      orderId: 1,
      customerId: 101,
      customerName: 'John Doe',
      items: [
        {
          itemId: 1001,
          itemName: 'Product A',
          quantity: 2,
          uom: 'pcs',
          id: 1,
        },
        {
          itemId: 1002,
          itemName: 'Product B',
          quantity: 1,
          uom: 'pcs',
          id: 2,
        },
      ],
      grossAmount: 150,
      paymentMethods: {
        cash: 100,
        cheque: 20,
        card: 30,
      },
      id: 1,
    },
    {
      orderId: 2,
      customerId: 102,
      customerName: 'Jane Doe',
      items: [
        {
          itemId: 1003,
          itemName: 'Product C',
          quantity: 3,
          uom: 'pcs',
          id: 3,
        },
        {
          itemId: 1004,
          itemName: 'Product D',
          quantity: 1,
          uom: 'pcs',
          id: 4,
        },
      ],
      grossAmount: 200,
      paymentMethods: {
        cash: 150,
        card: 50,
      },
      id: 2,
    },
  ];

  //END OF MOCK DATA

  const {setRows, rows} = useOutletContext<StockCheckInContext>();
  const [isTableLoaded, setIsTableLoaded] = useState(false);
  function fetchRows() {
    const parsedRows: TransactionHistory[] = mockData;
    setRows(parsedRows);
    setIsTableLoaded(true);
  }
  function getTransactionRowId(row: Row) {
    if (typeof row.orderId === 'number') {
      return row.orderId;
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
        columns={transactionColDef}
        getRowId={getTransactionRowId}
        showLoading={!isTableLoaded}
      />
    </>
  );
}

export default TransactionTable;
