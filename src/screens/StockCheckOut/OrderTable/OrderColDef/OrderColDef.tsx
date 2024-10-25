// Table Column Definition
import {GridColDef, GridColumnHeaderParams} from '@mui/x-data-grid';
import ColumnHeader from 'component/ColumnHeader/ColumnHeader.tsx';
import ProductIcon from 'component/ProductIcon/ProductIcon.tsx';

export const orderColDef: GridColDef[] = [
  {
    field: 'name',
    headerName: 'table.product',
    flex: 0.6,
    headerClassName: 'font-md',
    headerAlign: 'center',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    // passing 'Product Icon' element to render cell function, so it is rendered instead of product name
    renderCell: params => {
      return (
        <ProductIcon
          productId={params.row.externalId}
          productName={params.value}
          productImage={params.row.imageSrc}
        />
      );
    },
    sortable: false,
  },
  {
    field: 'description',
    headerClassName: 'font-md',
    headerName: 'table.description',
    renderHeader: (params: GridColumnHeaderParams) => {
      return (
        <div style={{paddingLeft: '46px'}}>
          <ColumnHeader headerName={params.colDef.headerName || ''} />
        </div>
      );
    },
    flex: 0.8,
    cellClassName: 'productText font-sm',
    sortable: false,
  },
  {
    field: 'quantity',
    headerName: 'table.initialStock',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    headerClassName: 'font-md',
    flex: 0.3,
    cellClassName: 'stock font-sm',
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'uom',
    headerName: 'table.uom',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    headerClassName: 'font-md',
    flex: 0.3,
    cellClassName: 'productText font-sm',
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
];

