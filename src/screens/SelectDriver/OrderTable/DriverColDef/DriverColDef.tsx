// Table Column Definition
import {GridColDef, GridColumnHeaderParams} from '@mui/x-data-grid';
import ProductIcon from '../../../../component/ProductIcon/ProductIcon.tsx';
import ColumnHeader from '../../../../component/ColumnHeader/ColumnHeader.tsx';

export const driverColDef: GridColDef[] = [
  {
    field: 'name',
    headerName: 'table.product',
    flex: 0.7,
    headerClassName: 'font-md',
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
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    flex: 0.8,
    cellClassName: 'productText font-xsm',
    sortable: false,
  },
  {
    field: 'initialStock',
    headerName: 'table.initialStock',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    headerClassName: 'font-md',
    flex: 0.5,
    cellClassName: 'stock font-sm',
    sortable: false,
  },
  {
    field: 'uom',
    headerName: 'table.uom',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    headerClassName: 'font-md',
    flex: 0.5,
    cellClassName: 'productText font-sm',
    sortable: false,
  },
];
