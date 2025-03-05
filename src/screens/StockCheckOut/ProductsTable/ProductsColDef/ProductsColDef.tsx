import {GridColDef, GridColumnHeaderParams} from '@mui/x-data-grid';
import ProductIcon from 'component/ProductIcon/ProductIcon.tsx';
import ColumnHeader from 'component/ColumnHeader/ColumnHeader.tsx';

export const productsColDef: GridColDef[] = [
  {
    field: 'name',
    headerName: 'table.product',
    flex: 0.8,
    headerClassName: 'font-md',
    // passing 'Product Icon' element to render cell function, so it is rendered instead of product name
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    renderCell: params => {
      return (
        <ProductIcon
          productId={params.row.productId}
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
    flex: 1,
    cellClassName: 'productText font-sm',
    sortable: false,
  },
  {
    field: 'quantity',
    headerName: 'table.quantity',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    headerClassName: 'font-md',
    flex: 0.7,
    cellClassName: 'quantity font-sm',
    sortable: false,
  },
  {
    field: 'uom',
    headerName: 'table.uom',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    headerClassName: 'font-md',
    flex: 0.4,
    cellClassName: 'productText font-sm',
    sortable: false,
  },
];
