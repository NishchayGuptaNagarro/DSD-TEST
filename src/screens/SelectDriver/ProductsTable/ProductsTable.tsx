import {GridColDef} from '@mui/x-data-grid';
import {useTranslation} from 'react-i18next';

import {ProductTableProps} from './propTypes/types.ts';
import ProductIcon from 'component/ProductIcon/ProductIcon.tsx';
import Table from 'component/Table/Table.tsx';
import {Row} from 'component/Table/propTypes/types.ts';

function ProductsTable({products}: ProductTableProps) {
  const {t} = useTranslation();
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('table.product'),
      flex: 0.8,
      headerClassName: 'font-md',
      // passing 'Product Icon' element to render cell function, so it is rendered instead of product name
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
      headerName: t('table.description'),
      flex: 1,
      cellClassName: 'productText font-sm',
      sortable: false,
    },
    {
      field: 'quantity',
      headerName: t('table.quantity'),
      headerClassName: 'font-md',
      flex: 0.7,
      cellClassName: 'quantity font-sm',
      sortable: false,
    },
    {
      field: 'uom',
      headerName: t('table.uom'),
      headerClassName: 'font-md',
      flex: 0.4,
      valueGetter: () => {
        return 'Unit';
      },
      cellClassName: 'productText font-sm',
      sortable: false,
    },
  ];

  // This function returns a row's unique ID
  function getRowId(row: Row) {
    if (typeof row.productId === 'number') {
      return row.productId;
    } else {
      throw new Error('row id should be number');
    }
  }

  return (
    <Table
      getRowId={getRowId}
      columns={columns}
      rows={products}
      showLoading={false}
    />
  );
}

export default ProductsTable;
