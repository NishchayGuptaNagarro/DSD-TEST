import Button from '@mui/material/Button';
import {
  getGridDateOperators,
  getGridStringOperators,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import ColumnHeader from 'component/ColumnHeader/ColumnHeader.tsx';
import {InfoTooltip} from 'component/InfoTooltip/InfoTooltip.tsx';
import {Attachment} from 'models/Attachment.ts';
import {Stock} from 'models/Stock.ts';
import {
  DeliveryTransactionHistory,
  TransactionHistory,
} from 'models/TransactionHistory.ts';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';
import {getLocalDate} from 'utilities/getLocalDate.ts';
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
    transactions: TransactionHistory[] | DeliveryTransactionHistory[],
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
      flex: 0.4,
      headerClassName: 'font-md',
      filterOperators: stringFilters,
      cellClassName: 'font-sm font-normal',
      sortable: false,
      headerAlign: 'center',
      renderHeader: (params: GridColumnHeaderParams) => {
        return <ColumnHeader headerName={params.colDef.headerName || ''} />;
      },
      renderCell: (params: GridRenderCellParams<AllDriverHistory>) => {
        return <div className="driver-id-cell">{params.value}</div>;
      },
    },
    {
      field: 'date',
      headerClassName: 'font-md',
      headerName: t('table.date'),
      filterOperators: dateFilter,
      type: 'date',
      renderHeader: (params: GridColumnHeaderParams) => {
        return (
          <div className="date-header">
            <ColumnHeader headerName={params.colDef.headerName || ''} />
          </div>
        );
      },
      valueFormatter: (params: GridValueFormatterParams) => {
        return getLocalDate(params.value);
      },
      valueGetter: (params: GridRenderCellParams) => {
        return new Date(params.value);
      },
      flex: 0.4,
      sortable: true,
      sortingOrder: ['desc', 'asc'],
      cellClassName: 'font-sm font-normal',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'transaction',
      headerName: t('sidebar.orders'),
      headerClassName: 'font-md',
      renderHeader: (params: GridColumnHeaderParams) => (
        <div className="column-header">
          <ColumnHeader headerName={params.colDef.headerName || ''} />
          <InfoTooltip title={'toolTip.orders'} />
        </div>
      ),
      renderCell: (
        params: GridRenderCellParams<
          AllDriverHistory,
          TransactionHistory[],
          DeliveryTransactionHistory[]
        >,
      ) => {
        return (
          <div className="action-cell">
            {(params.value?.length || 0) > 0 && (
              <OrdersButton
                orders={params.value || []}
                driverId={params.row.driverId || ''}
                handleOrdersClick={handleOrdersClick}
              />
            )}
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
      renderHeader: (params: GridColumnHeaderParams) => (
        <div className="column-header">
          <ColumnHeader headerName={params.colDef.headerName || ''} />
          <InfoTooltip title={'toolTip.stocks'} />
        </div>
      ),
      renderCell: (params: GridRenderCellParams<AllDriverHistory, Stock[]>) => {
        return (
          <div className="action-cell">
            {(params.value?.length || 0) > 0 && (
              <StocksButton
                stocks={params.value || []}
                driverId={params.row.driverId || ''}
                handleStocksClick={handleStocksClick}
              />
            )}
          </div>
        );
      },
      flex: 0.2,
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
      renderHeader: (params: GridColumnHeaderParams) => (
        <div className="column-header">
          <ColumnHeader headerName={params.colDef.headerName || ''} />
          <InfoTooltip title={'toolTip.attachments'} />
        </div>
      ),
      renderCell: (
        params: GridRenderCellParams<AllDriverHistory, Attachment[]>,
      ) => {
        return (
          <div className="action-cell">
            {(params.value?.length || 0) > 0 && (
              <AttachmentsButton
                attachments={params.value || []}
                driverId={params.row.driverId || ''}
                handleAttachmentsClick={handleAttachmentsClick}
              />
            )}
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

