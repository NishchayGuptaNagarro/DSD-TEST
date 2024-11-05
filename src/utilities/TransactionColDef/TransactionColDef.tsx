import Stack from '@mui/material/Stack';
import {
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import ColumnHeader from 'component/ColumnHeader/ColumnHeader.tsx';
import {
  PaymentGridProps,
  PaymentMethods,
  TransactionHistory,
} from 'models/TransactionHistory.ts';

export const transactionColDef: GridColDef[] = [
  {
    field: 'orderId',
    headerName: 'table.orderId',
    flex: 0.2,
    headerClassName: 'font-lg font-normal',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    sortable: false,
    cellClassName: 'font-md font-normal',
  },
  {
    field: 'customerId',
    headerName: 'table.customerDesc',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    headerClassName: 'font-lg font-normal',
    valueGetter: ({value, row}) => {
      return `${value} : ${row.customerName}`;
    },
    flex: 0.34,
    cellClassName: 'font-md font-normal',
    sortable: false,
  },
  {
    field: 'grossAmount',
    headerName: 'table.amount',
    flex: 0.2,
    headerClassName: 'font-lg font-normal',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    renderCell: (params: GridRenderCellParams<TransactionHistory>) => {
      return (
        <div>{`${(params.value ?? 0).toFixed(2)} ${params.row.currIso}`}</div>
      );
    },
    sortable: false,
    headerAlign: 'center',
    cellClassName: 'font-md font-normal',
    align: 'center',
  },
  {
    field: 'paymentMethods',
    headerName: 'table.payment',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    headerClassName: 'font-lg font-normal',

    renderCell: (
      params: GridRenderCellParams<TransactionHistory, PaymentMethods>,
    ) => {
      return <PaymentGrid paymentMethods={params.value || {}} />;
    },
    flex: 0.3,
    cellClassName: 'font-md font-normal',
    sortable: false,
    headerAlign: 'center',
  },
];

function PaymentGrid({paymentMethods}: PaymentGridProps) {
  return (
    <Stack sx={{ml: 9, paddingBlock: '6px'}} flexDirection={'column'} gap={0.2}>
      <div>Credit: {(paymentMethods.credit ?? 0).toFixed(2)}</div>
      <div>Cash: {(paymentMethods.cash ?? 0).toFixed(2)}</div>
      <div>Cheque: {(paymentMethods.cheque ?? 0).toFixed(2)}</div>
    </Stack>
  );
}

