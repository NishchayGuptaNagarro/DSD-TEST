import {format} from 'date-fns';
import {TransactionHistory} from 'models/TransactionHistory.ts';
import {Stock} from 'models/Stock.ts';
import {Attachment} from 'models/Attachment.ts';
import {
  getGridDateOperators,
  getGridStringOperators,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';

import {useTranslation} from 'react-i18next';
import Button from '@mui/material/Button';
import {
  AllAttachmentsButtonProps,
  AllDriverHistory,
  AllOrderButtonProps,
  AllStockButtonProps,
} from '../propTypes/types.ts';

const stringFilters = getGridStringOperators().filter(item => {
  return item.value === 'contains';
});
const dateFilter = getGridDateOperators().filter(item => {
  return item.value === 'is';
});

export const allHistoryColDef: (
  handleOrdersClick: (transactions: TransactionHistory[]) => void,
  handleStocksClick: (stocks: Stock[]) => void,
  handleAttachmentsClick: (attachments: Attachment[]) => void,
) => GridColDef[] = (
  handleOrdersClick,
  handleStocksClick,
  handleAttachmentsClick,
) => {
  const {t} = useTranslation();
  return [
    {
      field: 'driverId',
      headerName: t('table.driverId'),
      flex: 0.3,
      headerClassName: 'font-md',
      filterOperators: stringFilters,
      sortable: false,
    },
    {
      field: 'date',
      headerClassName: 'font-md',
      headerName: t('table.date'),
      filterOperators: dateFilter,
      type: 'date',
      valueFormatter: (params: GridValueFormatterParams) => {
        return format(params.value, 'dd-MM-yyyy');
      },
      valueGetter: (params: GridRenderCellParams) => {
        return new Date(params.value);
      },
      flex: 0.4,
      cellClassName: 'font-sm',
      sortable: true,
    },
    {
      field: 'transaction',
      headerName: t('sidebar.orders'),
      headerClassName: 'font-md',
      renderCell: (
        params: GridRenderCellParams<AllDriverHistory, TransactionHistory[]>,
      ) => {
        return (
          <OrdersButton
            orders={params.value || []}
            handleOrdersClick={handleOrdersClick}
          />
        );
      },
      flex: 0.3,
      cellClassName: 'font-sm',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: 'stock',
      headerName: t('table.stocks'),
      headerClassName: 'font-md',

      renderCell: (params: GridRenderCellParams<AllDriverHistory, Stock[]>) => {
        return (
          <StocksButton
            stocks={params.value || []}
            handleStocksClick={handleStocksClick}
          />
        );
      },
      flex: 0.3,
      cellClassName: 'font-sm',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: 'attachment',
      headerName: t('timeline.option9'),
      headerClassName: 'font-md',
      renderCell: (
        params: GridRenderCellParams<AllDriverHistory, Attachment[]>,
      ) => {
        return (
          <AttachmentsButton
            attachments={params.value || []}
            handleAttachmentsClick={handleAttachmentsClick}
          />
        );
      },
      flex: 0.3,
      cellClassName: 'font-sm',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
  ];
};

function OrdersButton({orders, handleOrdersClick}: AllOrderButtonProps) {
  const {t} = useTranslation();
  return (
    <Button
      variant="text"
      sx={{
        fontSize: 10,
      }}
      size={'small'}
      onClick={() => {
        handleOrdersClick(orders);
      }}>
      {t('table.view.orders')}
    </Button>
  );
}
function StocksButton({stocks, handleStocksClick}: AllStockButtonProps) {
  const {t} = useTranslation();
  return (
    <Button
      variant="text"
      sx={{
        fontSize: 10,
      }}
      size={'small'}
      onClick={() => {
        handleStocksClick(stocks);
      }}>
      {t('table.view.stocks')}
    </Button>
  );
}
function AttachmentsButton({
  attachments,
  handleAttachmentsClick,
}: AllAttachmentsButtonProps) {
  const {t} = useTranslation();
  return (
    <Button
      variant="text"
      sx={{
        fontSize: 10,
      }}
      size={'small'}
      onClick={() => {
        handleAttachmentsClick(attachments);
      }}>
      {t('table.view.attachments')}
    </Button>
  );
}
