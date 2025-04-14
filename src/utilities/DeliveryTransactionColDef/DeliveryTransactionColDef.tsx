import {Button} from '@mui/material';
import {GridColDef, GridColumnHeaderParams} from '@mui/x-data-grid';
import ColumnHeader from 'component/ColumnHeader/ColumnHeader.tsx';
import {OrdersResponse} from 'models/DriverHistoryResponse';
import {useTranslation} from 'react-i18next';
import {OrderInfoButtonProps} from 'screens/StockCheckOut/MyOrder/propTypes/types';
import styles from 'styles/design-systems.module.scss';
import {commonTransactionColDef} from 'utilities/commonTransactionColDef/CommonTransactionColDef';
export const deliveryTransactionColDef: (
  handleOrderInfoClick: (orderInfo: OrdersResponse) => void,
) => GridColDef[] = handleOrderInfoClick => {
  return [
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
      field: 'order_detail',
      headerName: 'table.orderDetails',
      renderHeader: (params: GridColumnHeaderParams) => {
        return <ColumnHeader headerName={params.colDef.headerName || ''} />;
      },
      renderCell: params => {
        return (
          <div className="action-cell">
            <OrdersButton
              orderInfo={params?.row || {}}
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
  ...commonTransactionColDef,
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
