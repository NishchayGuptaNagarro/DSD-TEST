// Table Column Definition
import {Button} from '@mui/material';
import {GridColDef, GridColumnHeaderParams} from '@mui/x-data-grid';
import ColumnHeader from 'component/ColumnHeader/ColumnHeader.tsx';
import ProductIcon from 'component/ProductIcon/ProductIcon';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';
import {MyOrderInfoButtonProps} from '../propTypes/types';

export const myOrdercolumns: (
  handleOrderInfoClick: (orderId: number | string) => void,
) => GridColDef[] = handleOrderInfoClick => {
  return [
    {
      field: 'customerId',
      headerName: 'table.customerDesc',
      renderHeader: (params: GridColumnHeaderParams) => {
        return <ColumnHeader headerName={params.colDef.headerName || ''} />;
      },
      renderCell: params => {
        return <div className="my-order-id-cell">{params.value}</div>;
      },
      headerClassName: 'font-md',
      flex: 0.3,
      cellClassName: 'stock font-sm',
      sortable: false,
      headerAlign: 'center',
      align: 'center',
    },

    {
      field: 'name',
      headerName: 'table.customerName',
      renderHeader: (params: GridColumnHeaderParams) => {
        return (
          <div className="customer-name-header">
            <ColumnHeader headerName={params.colDef.headerName || ''} />
          </div>
        );
      },
      renderCell: params => {
        return <div className="customer-name-cell">{params.value}</div>;
      },
      headerClassName: 'font-md',
      flex: 0.3,
      cellClassName: 'stock font-sm',
      sortable: false,
      headerAlign: 'left',
      align: 'left',
    },

    {
      field: 'orderId',
      headerName: 'table.orderId',
      renderHeader: (params: GridColumnHeaderParams) => {
        return <ColumnHeader headerName={params.colDef.headerName || ''} />;
      },
      renderCell: params => {
        return <div className="my-order-cell">{params.value}</div>;
      },
      headerClassName: 'font-md',
      flex: 0.3,
      cellClassName: 'stock font-sm',
      sortable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'order_detail',
      headerName: 'table.orderDetails',
      renderHeader: (params: GridColumnHeaderParams) => {
        return <ColumnHeader headerName={params.colDef.headerName || ''} />;
      },
      renderCell: params => {
        return (
          <div className="action-cell">
            <OrdersButton
              orderId={params.id || 0}
              handleOrderInfoClick={handleOrderInfoClick}
            />
          </div>
        );
      },
      headerClassName: 'font-md',
      flex: 0.3,
      cellClassName: 'stock font-sm',
      sortable: false,
      headerAlign: 'center',
      align: 'center',
    },
  ];
};

function OrdersButton({orderId, handleOrderInfoClick}: MyOrderInfoButtonProps) {
  const {t} = useTranslation();
  return (
    <Button
      variant="contained"
      className="action-button"
      sx={{
        backgroundColor: styles.bgPowderBlue,
        color: styles.deepNavy,
      }}
      size={'small'}
      onClick={() => {
        handleOrderInfoClick(orderId);
      }}>
      {t('table.view')}
    </Button>
  );
}

// dialog Order details cols
export const orderDetailsColumns: GridColDef[] = [
  {
    field: 'description',
    headerName: 'table.items',
    flex: 0.6,
    headerClassName: 'font-md',
    headerAlign: 'left',
    renderHeader: (params: GridColumnHeaderParams) => {
      return (
        <div className="customer-id-header">
          <ColumnHeader headerName={params.colDef.headerName || ''} />
        </div>
      );
    },
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
    field: 'quantity',
    headerName: 'timeline.option8',
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

