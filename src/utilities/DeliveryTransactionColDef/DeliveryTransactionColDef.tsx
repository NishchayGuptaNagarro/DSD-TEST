import {Button} from '@mui/material';
import {
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import ColumnHeader from 'component/ColumnHeader/ColumnHeader.tsx';
import {OrdersResponse} from 'models/DriverHistoryResponse';
import {DeliveryTransactionHistory} from 'models/TransactionHistory';
import {useTranslation} from 'react-i18next';
import {OrderInfoButtonProps} from 'screens/StockCheckOut/MyOrder/propTypes/types';
import styles from 'styles/design-systems.module.scss';
import {commonTransactionColDef} from 'utilities/commonTransactionColDef/CommonTransactionColDef';
export const deliveryTransactionColDef: (
  handleOrderInfoClick: (orderInfo: OrdersResponse[]) => void,
) => GridColDef[] = handleOrderInfoClick => {
  return [
    {
      field: 'customerId',
      headerName: 'table.customerDesc',
      renderHeader: (params: GridColumnHeaderParams) => {
        return (
          <div className="delivery-customer-id-header">
            <ColumnHeader headerName={params.colDef.headerName || ''} />
          </div>
        );
      },
      headerAlign: 'left',
      align: 'left',
      headerClassName: 'font-md font-normal',
      renderCell: (
        params: GridRenderCellParams<DeliveryTransactionHistory>,
      ) => {
        return <div className="delivery-customer-id-cell">{params.value}</div>;
      },
      flex: 0.34,
      cellClassName: 'font-sm font-normal',
      sortable: false,
    },
    {
      field: 'order_detail',
      headerName: 'table.orderDetails',
      renderHeader: (params: GridColumnHeaderParams) => {
        return <ColumnHeader headerName={params.colDef.headerName || ''} />;
      },
      renderCell: params => {
        console.log(params);
        return (
          <div className="action-cell">
            <OrdersButton
              orderInfo={params?.row?.orders || {}}
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

export const historyDetailsColDef: GridColDef[] = [
  {
    field: 'orderId',
    headerName: 'table.orderId',
    flex: 0.2,
    headerClassName: 'font-md font-normal',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    cellClassName: 'font-sm font-normal',
  },
  {
    field: 'status',
    headerName: 'table.status',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    renderCell: params => {
      return <div className="my-order-cell">{params.value}</div>;
    },
    headerClassName: 'font-md',
    flex: 0.3,
    cellClassName: 'stock font-sm font-normal',
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  ...commonTransactionColDef.slice(1),
];

function OrdersButton({orderInfo, handleOrderInfoClick}: OrderInfoButtonProps) {
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
        handleOrderInfoClick(orderInfo);
      }}>
      {t('table.view')}
    </Button>
  );
}
