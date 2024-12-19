import {
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import ColumnHeader from 'component/ColumnHeader/ColumnHeader.tsx';
import {Stock} from 'models/Stock';

export const stockColDef: GridColDef[] = [
  {
    field: 'item',
    headerName: 'table.items',
    flex: 0.5,
    headerClassName: 'font-md font-normal',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    align: 'center',
    headerAlign: 'center',
    cellClassName: 'font-sm font-normal',
    sortable: false,
  },
  {
    field: 'initial',
    headerName: 'table.initialStock',
    headerClassName: 'font-md font-normal',
    flex: 0.5,
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    renderCell: (params: GridRenderCellParams<Stock[]>) => {
      return <div className="stock-cell">{params.value}</div>;
    },
    cellClassName: 'font-sm font-normal',
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'remaining',
    headerName: 'table.remaining',
    headerClassName: 'font-md font-normal',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    renderCell: (params: GridRenderCellParams<Stock[]>) => {
      return <div className="stock-cell">{params.value}</div>;
    },
    flex: 0.5,
    cellClassName: 'font-sm font-normal',
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
];

