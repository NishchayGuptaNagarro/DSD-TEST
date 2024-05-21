import {GridColDef, GridColumnHeaderParams} from '@mui/x-data-grid';
import ColumnHeader from 'component/ColumnHeader/ColumnHeader.tsx';

export const stockColDef: GridColDef[] = [
  {
    field: 'item',
    headerName: 'table.items',
    flex: 0.5,
    headerClassName: 'font-md',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    cellClassName: 'font-md',
    sortable: false,
  },
  {
    field: 'initial',
    headerName: 'table.initialStock',
    headerClassName: 'font-md',
    flex: 0.5,
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    cellClassName: 'font-md',
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'remaining',
    headerName: 'table.remaining',
    headerClassName: 'font-md',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    flex: 0.5,
    cellClassName: 'font-md',
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
];
