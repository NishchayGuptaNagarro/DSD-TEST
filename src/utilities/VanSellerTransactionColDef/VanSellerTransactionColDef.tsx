import {GridColDef, GridColumnHeaderParams} from '@mui/x-data-grid';
import ColumnHeader from 'component/ColumnHeader/ColumnHeader.tsx';
import {commonTransactionColDef} from 'utilities/commonTransactionColDef/CommonTransactionColDef';

export const vanSellerTransactionColDef: GridColDef[] = [
  {
    field: 'orderId',
    headerName: 'table.orderId',
    flex: 0.2,
    headerClassName: 'font-md font-normal',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    cellClassName: 'font-sm font-normal',
  },

  ...commonTransactionColDef,
];
