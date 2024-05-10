import {
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import ColumnHeader from 'component/ColumnHeader/ColumnHeader.tsx';
import {
  PaymentGridProps,
  PaymentMethods,
  TransactionHistory,
} from '../propTypes/types.ts';

export const transactionColDef: GridColDef[] = [
  {
    field: 'orderId',
    headerName: 'table.orderId',
    flex: 0.2,
    headerClassName: 'font-md',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    sortable: false,
  },
  {
    field: 'customerId',
    headerName: 'table.customerDesc',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    headerClassName: 'font-md',
    valueGetter: ({value, row}) => {
      return `${value} : ${row.customerName}`;
    },
    flex: 0.4,
    cellClassName: 'font-sm',
    sortable: false,
  },
  {
    field: 'grossAmount',
    headerName: 'table.amount',
    flex: 0.3,
    headerClassName: 'font-md',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    valueGetter: ({value}) => {
      return `${value} MAD`;
    },
    sortable: false,
  },
  {
    field: 'paymentMethods',
    headerName: 'table.payment',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    headerClassName: 'font-md',

    renderCell: (
      params: GridRenderCellParams<TransactionHistory, PaymentMethods>,
    ) => {
      return <PaymentGrid paymentMethods={params.value || {}} />;
    },
    flex: 0.5,
    cellClassName: 'font-sm',
    sortable: false,
  },
];

function PaymentGrid({paymentMethods}: PaymentGridProps) {
  return (
    <Stack flexDirection={'row'} gap={1}>
      {paymentMethods.cash && <div>Cash:{paymentMethods.cash}</div>}
      {paymentMethods.card && <div>Card:{paymentMethods.card}</div>}
      {paymentMethods.cheque && <div>Cheque:{paymentMethods.cheque}</div>}
    </Stack>
  );
}
