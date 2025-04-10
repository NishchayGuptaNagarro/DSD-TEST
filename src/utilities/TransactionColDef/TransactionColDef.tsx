import {Button} from '@mui/material';
import Stack from '@mui/material/Stack';
import {
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import ColumnHeader from 'component/ColumnHeader/ColumnHeader.tsx';
import {OrdersResponse} from 'models/DriverHistoryResponse';
import {
  PaymentGridProps,
  PaymentMethods,
  TransactionHistory,
} from 'models/TransactionHistory.ts';
import {useTranslation} from 'react-i18next';
import {OrderInfoButtonProps} from 'screens/StockCheckOut/MyOrder/propTypes/types';
import styles from 'styles/design-systems.module.scss';
export const transactionColDef: (
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
  {
    field: 'customerId',
    headerName: 'table.customerDesc',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'font-md font-normal',
    valueGetter: ({value, row}) => {
      return `${value} : ${row.customerName}`;
    },
    flex: 0.34,
    cellClassName: 'font-sm font-normal',
    sortable: false,
  },
  {
    field: 'grossAmount',
    headerName: 'table.amount',
    flex: 0.2,
    headerClassName: 'font-md font-normal',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    renderCell: (params: GridRenderCellParams<TransactionHistory>) => {
      return (
        <div>{`${(params.value ?? 0).toFixed(2)} ${params.row.currIso || ''}`}</div>
      );
    },
    sortable: false,
    headerAlign: 'center',
    cellClassName: 'font-sm font-normal',
    align: 'center',
  },

  {
    field: 'paymentMethods',
    headerName: 'table.payment',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    headerClassName: 'font-md font-normal',

    renderCell: (
      params: GridRenderCellParams<TransactionHistory, PaymentMethods>,
    ) => {
      return <PaymentGrid paymentMethods={params.value || {}} />;
    },
    flex: 0.3,
    cellClassName: 'font-sm font-normal',
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },

  {
    field: 'status',
    headerName: 'table.status',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    renderCell: params => {
      return <div className="myOrder-cell">{params.value}</div>;
    },
    headerClassName: 'font-md',
    flex: 0.3,
    cellClassName: 'stock font-sm',
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
];
function PaymentGrid({paymentMethods}: PaymentGridProps) {
  return (
    <Stack sx={{paddingBlock: '6px'}} flexDirection={'column'} gap={0.2}>
      <div>Credit: {(paymentMethods.credit ?? 0).toFixed(2)}</div>
      <div>Cash: {(paymentMethods.cash ?? 0).toFixed(2)}</div>
      <div>Cheque: {(paymentMethods.cheque ?? 0).toFixed(2)}</div>
    </Stack>
  );
}

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
