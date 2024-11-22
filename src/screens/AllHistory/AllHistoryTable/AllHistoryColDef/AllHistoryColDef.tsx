import Button from '@mui/material/Button';
import {
  getGridDateOperators,
  getGridStringOperators,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import {format} from 'date-fns';
import {Attachment} from 'models/Attachment.ts';
import {Stock} from 'models/Stock.ts';
import {TransactionHistory} from 'models/TransactionHistory.ts';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';
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
  handleOrdersClick: (
    transactions: TransactionHistory[],
    driverId: string,
  ) => void,
  handleStocksClick: (stocks: Stock[], driverId: string) => void,
  handleAttachmentsClick: (attachments: Attachment[], driverId: string) => void,
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
      cellClassName: 'font-sm font-normal',
      sortable: false,
    },
    {
      field: 'date',
      headerClassName: 'font-md',
      headerName: t('table.date'),
      filterOperators: dateFilter,
      type: 'date',
      valueFormatter: (params: GridValueFormatterParams) => {
        return format(params.value, 'dd MMMM, yyyy');
      },
      valueGetter: (params: GridRenderCellParams) => {
        return new Date(params.value);
      },
      flex: 0.4,
      sortable: true,
      cellClassName: 'font-sm font-normal',
    },
    {
      field: 'transaction',
      headerName: t('sidebar.orders'),
      headerClassName: 'font-md',
      renderCell: (
        params: GridRenderCellParams<AllDriverHistory, TransactionHistory[]>,
      ) => {
        return (
          <div className="action-cell">
            <OrdersButton
              orders={params.value || []}
              driverId={params.row.driverId || ''}
              handleOrdersClick={handleOrdersClick}
            />
          </div>
        );
      },
      flex: 0.3,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'stock',
      headerName: t('table.stocks'),
      headerClassName: 'font-md',

      renderCell: (params: GridRenderCellParams<AllDriverHistory, Stock[]>) => {
        return (
          <div className="action-cell">
            <StocksButton
              stocks={params.value || []}
              driverId={params.row.driverId || ''}
              handleStocksClick={handleStocksClick}
            />
          </div>
        );
      },
      flex: 0.3,
      cellClassName: 'font-sm font-normal',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'attachment',
      headerName: t('timeline.option9'),
      headerClassName: 'font-md',
      renderCell: (
        params: GridRenderCellParams<AllDriverHistory, Attachment[]>,
      ) => {
        return (
          <div className="action-cell">
            <AttachmentsButton
              attachments={params.value || []}
              driverId={params.row.driverId || ''}
              handleAttachmentsClick={handleAttachmentsClick}
            />
          </div>
        );
      },
      flex: 0.3,
      cellClassName: 'font-sm font-normal',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
    },
  ];
};

function OrdersButton({
  orders,
  driverId,
  handleOrdersClick,
}: AllOrderButtonProps) {
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
        handleOrdersClick(orders, driverId);
      }}>
      {t('table.view')}
    </Button>
  );
}
function StocksButton({
  stocks,
  driverId,
  handleStocksClick,
}: AllStockButtonProps) {
  const {t} = useTranslation();
  return (
    <Button
      variant="contained"
      className="action-button"
      sx={{
        backgroundColor: styles.bgLightMintGreen,
        color: styles.forestGreen,
      }}
      size={'small'}
      onClick={() => {
        handleStocksClick(stocks, driverId);
      }}>
      {t('table.view')}
    </Button>
  );
}
function AttachmentsButton({
  attachments,
  driverId,
  handleAttachmentsClick,
}: AllAttachmentsButtonProps) {
  const {t} = useTranslation();
  return (
    <Button
      variant="contained"
      className="action-button"
      sx={{
        backgroundColor: styles.bgPeach,
        color: styles.chocolateBrown,
      }}
      size={'small'}
      onClick={() => {
        handleAttachmentsClick(attachments, driverId);
      }}>
      {t('table.view')}
    </Button>
  );
}

