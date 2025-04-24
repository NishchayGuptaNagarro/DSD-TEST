import {Dialog} from '@mui/material';
import Table from 'component/Table/Table.tsx';
import {useOutletContext} from 'react-router-dom';
import {getTransactionRowId} from 'utilities/getTransactionRowId.ts';
import {StockCheckInContext} from '../propTypes/types.ts';

import TableDialogContent from 'component/TableDialogContent/TableDialogContent.tsx';
import {OrdersResponse} from 'models/DriverHistoryResponse.ts';
import {useState} from 'react';
import {historyDetailsColDef} from 'utilities/DeliveryTransactionColDef/DeliveryTransactionColDef.tsx';
import {getTransactionColDef} from 'utilities/getTransactionColDef.ts';
function TransactionTable() {
  const {transactionArr, driverType} = useOutletContext<StockCheckInContext>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTableRow, setDialogTableRow] = useState<OrdersResponse[]>([]);

  const handleOrderInfosClick = (orderInfo: OrdersResponse[]) => {
    setDialogTableRow(orderInfo);
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
          showLoading={false}
          selectedDriverId=""
          dialogHeader="table.orderDetails"
          noOfRows={3}
        />
      </Dialog>
      <Table
        noOfRows={5}
        showMenu={false}
        rows={transactionArr}
        columns={getTransactionColDef(driverType, handleOrderInfosClick)}
        getRowId={getTransactionRowId}
        showLoading={false}
        minHeight={480}
      />
    </>
  );
}

export default TransactionTable;

