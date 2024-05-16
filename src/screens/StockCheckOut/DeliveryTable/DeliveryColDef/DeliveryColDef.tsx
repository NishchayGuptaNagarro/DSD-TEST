import {
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ColumnHeader from 'component/ColumnHeader/ColumnHeader.tsx';
import {DeliveryTableRow, ProductsButtonProps} from '../propTypes/types.ts';
import {Product} from 'models/Product.ts';
import productSVG from 'assets/SVG/Products.svg';
import {useTranslation} from 'react-i18next';
export const deliveryColDef: (
  handleButtonClick: (products: Product[]) => void,
) => GridColDef[] = handleButtonClick => [
  {
    field: 'orderId',
    headerName: 'table.orderId',
    flex: 0.3,
    headerClassName: 'font-md',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    sortable: false,
  },
  {
    field: 'orderDescription',
    headerClassName: 'font-md',
    headerName: 'table.orderDescription',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    flex: 0.6,
    cellClassName: 'productText font-xsm',
    sortable: false,
  },
  {
    field: 'customerId',
    headerName: 'table.customerDesc',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    headerClassName: 'font-md',
    valueGetter: ({value, row}) => {
      return `${value} : ${row.customerName}`;
    },
    flex: 0.5,
    cellClassName: 'font-sm',
    sortable: false,
  },
  {
    field: 'products',
    headerName: 'table.products',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    headerClassName: 'font-md',

    renderCell: (params: GridRenderCellParams<DeliveryTableRow, Product[]>) => {
      return (
        <ProductsButton
          products={params.value || []}
          handleClick={handleButtonClick}
        />
      );
    },
    flex: 0.5,
    cellClassName: 'font-sm',
    sortable: false,
  },
];

function ProductsButton({products, handleClick}: ProductsButtonProps) {
  const {t} = useTranslation();
  return (
    <Button
      startIcon={<img src={productSVG} alt={'icon'} />}
      variant="text"
      sx={{
        fontSize: 10,
      }}
      size={'small'}
      onClick={() => {
        handleClick(products);
      }}>
      {t('table.button')}
    </Button>
  );
}
