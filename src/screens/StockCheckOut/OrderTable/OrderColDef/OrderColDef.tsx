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
        <div className="description-header">
          <ColumnHeader headerName={params.colDef.headerName || ''} />
        </div>
      );
    },
    renderCell: params => {
      return <div className="description-cell">{params.value}</div>;
    },
    flex: 0.9,
    cellClassName: 'productText font-sm',
    sortable: false,
  },
  {
    field: 'quantity',
    headerName: 'table.initialStock',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    renderCell: params => {
      return <div className="quantity-cell">{params.value}</div>;
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
    renderCell: params => {
      return <div className="uom-cell">{params.value}</div>;
    },
    headerClassName: 'font-md',
    flex: 0.2,
    cellClassName: 'productText font-sm',
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
];

