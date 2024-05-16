import {GridColDef} from '@mui/x-data-grid';
import {useTranslation} from 'react-i18next';

import ProductIcon from 'component/ProductIcon/ProductIcon.tsx';
import Table from 'component/Table/Table.tsx';
import {ProductTableProps} from './propTypes/types.ts';
import {getProductRowId} from 'utilities/getProductRowId.ts';

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
      cellClassName: 'productText font-sm',
      sortable: false,
    },
  ];

  return (
    <Table
      noOfRows={5}
      showMenu={false}
      getRowId={getProductRowId}
      columns={columns}
      rows={products}
      showLoading={false}
    />
  );
}

export default ProductsTable;
