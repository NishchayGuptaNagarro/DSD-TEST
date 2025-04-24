import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {useEffect, useState} from 'react';

import Table from 'component/Table/Table.tsx';
import {attachmentColDef} from 'utilities/AttachmentColDef/AttachmentColDef.tsx';
import {stockColDef} from 'utilities/StockColDef/StockColDef.tsx';
import {allHistoryColDef} from './AllHistoryColDef/AllHistoryColDef.tsx';

import {api} from 'api/api.ts';
import {AxiosResponse} from 'axios';
import {Row} from 'component/Table/propTypes/types.ts';
import TableDialogContent from 'component/TableDialogContent/TableDialogContent.tsx';
import {Attachment} from 'models/Attachment.ts';
import {
  AllDriverHistoryResponse,
  OrdersResponse,
  SingleDriverHistoryResponse,
} from 'models/DriverHistoryResponse.ts';
import {Stock} from 'models/Stock.ts';
import {
  DeliveryTransactionHistory,
  TransactionHistory,
} from 'models/TransactionHistory.ts';
import {historyDetailsColDef} from 'utilities/DeliveryTransactionColDef/DeliveryTransactionColDef.tsx';
import {driverRoles} from 'utilities/enums.ts';
import {getAttachmentRowId} from 'utilities/getAttachmentRowId.ts';
import {getParsedOrders} from 'utilities/getParsedOrders.ts';
import {getStockRowId} from 'utilities/getStockRowId.ts';
import {getTransactionColDef} from 'utilities/getTransactionColDef.ts';
import {getTransactionRowId} from 'utilities/getTransactionRowId.ts';
import {AllDriverHistory, AllHistoryProps} from './propTypes/types.ts';
function AllHistoryTable({driverType, searchText}: AllHistoryProps) {
  const [transactionArr, setTransactionArr] = useState<
    TransactionHistory[] | DeliveryTransactionHistory[]
  >([]);
  const [stockArr, setStockArr] = useState<Stock[]>([]);
  const [attachmentArr, setAttachmentArr] = useState<Attachment[]>([]);

  const [showTransaction, setShowTransaction] = useState(false);
  const [showStocks, setShowStocks] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [driverHistoryArr, setDriverHistoryArr] = useState<AllDriverHistory[]>(
    [],
  );
  const [filteredArray, setFilteredArray] = useState<AllDriverHistory[]>([]);

  const [tableLoading, setTableLoading] = useState(true);

  async function fetchDriverHistory() {
    setTableLoading(true);
    try {
      const response: AxiosResponse<AllDriverHistoryResponse> = await api.get(
        `/warehouse/all/drivers/history?business_role_id=${driverType}`,
      );
      console.log(response);
      let parsedResponse: AllDriverHistory[] = [];
      parsedResponse = response.data.data.map(
        (history: SingleDriverHistoryResponse, i) => {
          const parsedRes: AllDriverHistory = {
            rowId: i,
            date: history.date,
            driverId: history.user_id,
            transaction: getParsedOrders(
              history.orders,
              driverType ?? driverRoles.VAN_SELLER,
            ),
            stock: history.stocks.map(stock => {
              return {
                stockId: stock.id,
                initial: Number(stock.initial_stock),
                item: stock.product_id,
                remaining: Number(stock.remaining_stock),
              };
            }),
            attachment: history.attachments.map(attachment => {
              return {
                attachmentId: attachment.id,
                description: attachment.description,
                attachment: attachment.attachment,
              };
            }),
          };

          return parsedRes;
        },
      );
      console.log(parsedResponse);
      setDriverHistoryArr(parsedResponse);
      setFilteredArray(parsedResponse);
      setTableLoading(false);
    } catch (error) {
      console.error(error);
      setDriverHistoryArr([]);
      setFilteredArray([]);
      setTableLoading(false);
    }
  }

  function filterByDriverId(searchText: string) {
    setFilteredArray(
      (driverHistoryArr || []).filter(driver =>
        driver.driverId.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
  }

  useEffect(() => {
    fetchDriverHistory();
  }, [driverType]);

  useEffect(() => {
    filterByDriverId(searchText);
  }, [searchText]);

  function handleOrdersClick(
    transactions: TransactionHistory[] | DeliveryTransactionHistory[],
    driverId: string,
  ) {
    setSelectedDriverId(driverId);
    setTransactionArr(transactions);
    setShowTransaction(true);
  }
  function handleStocksClick(stocks: Stock[], driverId: string) {
    setSelectedDriverId(driverId);
    setStockArr(stocks);
    setShowStocks(true);
  }
  function handleAttachmentsClick(attachments: Attachment[], driverId: string) {
    setSelectedDriverId(driverId);
    setAttachmentArr(attachments);
    setShowAttachments(true);
  }
  function handleImageClick(src: string) {
    setImageSrc(src);
    setShowImage(true);
  }

  function getAllHistoryRowId(row: Row) {
    if (typeof row.rowId === 'number') {
      return row.rowId;
    } else {
      throw new Error('row id should be number');
    }
  }

  // Nested delivery transaction state and functions
  const [isDeliveryTransactionDialogOpen, setIsDeliveryTransactionDialogOpen] =
    useState(false);
  const [deliveryOrderInfo, setDeliveryOrderInfo] = useState<OrdersResponse[]>(
    [],
  );

  const handleDeliveryOrderInfoClick = (orderInfo: OrdersResponse[]) => {
    setDeliveryOrderInfo(orderInfo);
    setIsDeliveryTransactionDialogOpen(true);
  };

  return (
    <>
      <Dialog
        className={'dialog-position-end table-dialog'}
        fullWidth={true}
        maxWidth={'md'}
        open={showTransaction}
        onClose={() => {
          setShowTransaction(false);
        }}>
        <TableDialogContent
          rows={transactionArr}
          columns={getTransactionColDef(
            driverType,
            handleDeliveryOrderInfoClick,
          )}
          getRowId={getTransactionRowId}
          setShowDialog={() => {
            setShowTransaction(false);
          }}
          selectedDriverId={selectedDriverId}
          dialogHeader="history.orderSummary"
          noOfRows={3}
        />
      </Dialog>

      {/* Nested Delivery transaction table */}
      <Dialog
        className="dialog-position-center table-dialog"
        fullWidth
        maxWidth="md"
        open={isDeliveryTransactionDialogOpen}
        onClose={() => setIsDeliveryTransactionDialogOpen(false)}>
        <TableDialogContent
          rows={deliveryOrderInfo}
          columns={historyDetailsColDef}
          getRowId={getTransactionRowId}
          setShowDialog={() => setIsDeliveryTransactionDialogOpen(false)}
          showLoading={false}
          selectedDriverId=""
          dialogHeader="table.orderDetails"
          noOfRows={3}
        />
      </Dialog>

      <Dialog
        className={'dialog-position-end table-dialog'}
        fullWidth={true}
        maxWidth={'md'}
        open={showStocks}
        onClose={() => {
          setShowStocks(false);
        }}>
        <TableDialogContent
          rows={stockArr}
          columns={stockColDef}
          getRowId={getStockRowId}
          setShowDialog={() => {
            setShowStocks(false);
          }}
          selectedDriverId={selectedDriverId}
          dialogHeader="history.stockDetails"
        />
      </Dialog>
      <Dialog
        className={'dialog-position-end table-dialog'}
        fullWidth={true}
        maxWidth={'md'}
        open={showAttachments}
        onClose={() => {
          setShowAttachments(false);
        }}>
        <TableDialogContent
          rows={attachmentArr}
          columns={attachmentColDef(handleImageClick)}
          getRowId={getAttachmentRowId}
          setShowDialog={() => {
            setShowAttachments(false);
          }}
          selectedDriverId={selectedDriverId}
          dialogHeader="history.attachment"
        />
      </Dialog>
      <Dialog
        className={'dialog-position-end table-dialog'}
        fullWidth={true}
        maxWidth={'md'}
        open={showImage}
        onClose={() => {
          setShowImage(false);
        }}>
        <DialogContent>
          <img src={imageSrc} className={'attachment'} alt={'attachment'} />
        </DialogContent>
      </Dialog>
      <Table
        noOfRows={7}
        showMenu={true}
        minHeight={520}
        rows={filteredArray}
        columns={allHistoryColDef(
          handleOrdersClick,
          handleStocksClick,
          handleAttachmentsClick,
        )}
        getRowId={getAllHistoryRowId}
        showLoading={tableLoading}
      />
    </>
  );
}
export default AllHistoryTable;

