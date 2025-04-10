import Table from 'component/Table/Table.tsx';
import {useOutletContext} from 'react-router-dom';
import {getTransactionRowId} from 'utilities/getTransactionRowId.ts';
import {historyDetailsColDef, transactionColDef} from 'utilities/TransactionColDef/TransactionColDef.tsx';
import {StockCheckInContext} from '../propTypes/types.ts';
import {Dialog} from '@mui/material';

import './TransactionTable.scss';
import {useState} from 'react';
import { Row } from 'component/Table/propTypes/types.ts';
import TableDialogContent from 'component/TableDialogContent/TableDialogContent.tsx';
import { OrdersResponse } from 'models/DriverHistoryResponse.ts';
function TransactionTable() {
  const {transactionArr} = useOutletContext<StockCheckInContext>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogTableLoading, setDialogTableLoading] = useState(false);
  const [dialogTableRow, setDialogTableRow] = useState<OrdersResponse[]>([]);
  
  const fetchOrderDetails = async (orderInfo: OrdersResponse) => {
    setDialogTableLoading(true);
    try {
      setDialogTableRow([orderInfo]);
    } catch (error) {
      console.error(error);
      setDialogTableRow([]);
    } finally {
      setDialogTableLoading(false);
    }
  };

  const handleOrderInfosClick = (orderInfo: OrdersResponse) => {
    fetchOrderDetails(orderInfo);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Dialog
        className="dialog-position-center table-dialog"
        fullWidth
        maxWidth="md"
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}>
        <TableDialogContent
          rows={dialogTableRow}
          columns={historyDetailsColDef}
          getRowId={getTransactionRowId}
          setShowDialog={() => setIsDialogOpen(false)}
          showLoading={isDialogTableLoading}
          selectedDriverId=""
          dialogHeader="table.orderDetails"
          noOfRows={3}
        />
      </Dialog>
      <Table
        noOfRows={5}
        showMenu={false}
        rows={transactionArr}
        columns={transactionColDef(handleOrderInfosClick)}
        getRowId={getTransactionRowId}
        showLoading={false}
        minHeight={480}
      />
    </>
  );
}

export default TransactionTable;
