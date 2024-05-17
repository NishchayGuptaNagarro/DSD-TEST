import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {useEffect, useState} from 'react';
import {AxiosResponse} from 'axios';
import {format} from 'date-fns';

import Table from 'component/Table/Table.tsx';
import {transactionColDef} from 'utilities/TransactionColDef/TransactionColDef.tsx';
import {stockColDef} from 'utilities/StockColDef/StockColDef.tsx';
import {attachmentColDef} from 'utilities/AttachmentColDef/AttachmentColDef.tsx';
import {allHistoryColDef} from './AllHistoryColDef/AllHistoryColDef.tsx';

import {AllDriverHistory} from './propTypes/types.ts';
import {DriverHistoryResponse} from 'models/DriverHistoryResponse.ts';
import {checkApiError} from 'utilities/checkApiError.ts';
import {api} from 'axios/api.ts';
import {TransactionHistory} from 'models/TransactionHistory.ts';
import {Stock} from 'models/Stock.ts';
import {Attachment} from 'models/Attachment.ts';
import {getTransactionRowId} from 'utilities/getTransactionRowId.ts';
import {getStockRowId} from 'utilities/getStockRowId.ts';
import {Row} from 'component/Table/propTypes/types.ts';
import {getAttachmentRowId} from 'utilities/getAttachmentRowId.ts';

function AllHistoryTable() {
  const [driverHistoryArr, setDriverHistoryArr] = useState<AllDriverHistory[]>(
    [],
  );
  const [transactionArr, setTransactionArr] = useState<TransactionHistory[]>(
    [],
  );
  const [stockArr, setStockArr] = useState<Stock[]>([]);
  const [attachmentArr, setAttachmentArr] = useState<Attachment[]>([]);

  const [showTransaction, setShowTransaction] = useState(false);
  const [showStocks, setShowStocks] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  const [tableLoading, setTableLoading] = useState(true);

  function handleOrdersClick(transactions: TransactionHistory[]) {
    setTransactionArr(transactions);
    setShowTransaction(true);
  }
  function handleStocksClick(stocks: Stock[]) {
    setStockArr(stocks);
    setShowStocks(true);
  }
  function handleAttachmentsClick(attachments: Attachment[]) {
    setAttachmentArr(attachments);
    setShowAttachments(true);
  }
  function handleImageClick(src: string) {
    setImageSrc(src);
    setShowImage(true);
  }

  async function fetchDriverHistory() {
    try {
      const response: AxiosResponse<DriverHistoryResponse> = await api.get(
        '/warehouse/all/drivers/history',
      );
      console.log(response);
      checkApiError(response);
      const {orders, stocks, attachments} = response.data.data;
      const parsedResponse: AllDriverHistory[] = [];

      orders.forEach(order => {
        const parsedOrder: TransactionHistory = {
          customerId: Number(order.customer.external_id),
          customerName: order.customer.customer_name,
          grossAmount: order.gross_amount,
          orderId: Number(order.order_number),
          paymentMethods: {
            cash: order.payment_method.cash,
            card: order.payment_method.credit,
            cheque: order.payment_method.cheque,
          },
        };

        const index = parsedResponse.findIndex(value => {
          return (
            value.driverId === order.user_id &&
            format(value.date, 'dd-MM-yyyy') ===
              format(order.complete_date, 'dd-MM-yyyy')
          );
        });
        if (index === -1) {
          parsedResponse.push({
            rowId: parsedResponse.length,
            date: order.complete_date,
            driverId: order.user_id,
            attachment: [],
            stock: [],
            transaction: [parsedOrder],
          });
        } else {
          parsedResponse[index].transaction.push(parsedOrder);
        }
      });

      stocks.forEach(stock => {
        const parsedStock: Stock = {
          stockId: stock.id,
          initial: Number(stock.initial_stock),
          item: stock.product_id,
          remaining: Number(stock.remaining_stock),
        };

        const index = parsedResponse.findIndex(value => {
          return (
            value.driverId === stock.user_id &&
            format(value.date, 'dd-MM-yyyy') ===
              format(stock.creation_date, 'dd-MM-yyyy')
          );
        });
        if (index === -1) {
          parsedResponse.push({
            rowId: parsedResponse.length,
            date: stock.creation_date,
            driverId: stock.user_id,
            attachment: [],
            stock: [parsedStock],
            transaction: [],
          });
        } else {
          parsedResponse[index].stock.push(parsedStock);
        }
      });

      attachments.forEach(attachment => {
        const parsedAttachment: Attachment = {
          attachmentId: attachment.id,
          description: attachment.description,
          attachment: attachment.attachment,
        };

        const index = parsedResponse.findIndex(value => {
          return (
            value.driverId === attachment.user_id &&
            format(value.date, 'dd-MM-yyyy') ===
              format(attachment.creation_date, 'dd-MM-yyyy')
          );
        });
        if (index === -1) {
          parsedResponse.push({
            rowId: parsedResponse.length,
            date: attachment.creation_date,
            driverId: attachment.user_id,
            attachment: [parsedAttachment],
            stock: [],
            transaction: [],
          });
        } else {
          parsedResponse[index].attachment.push(parsedAttachment);
        }
      });

      console.log(parsedResponse);
      setDriverHistoryArr(parsedResponse);
      setTableLoading(false);
    } catch (error) {
      console.log(error);
      setDriverHistoryArr([]);
      setTableLoading(false);
    }
  }

  function getAllHistoryRowId(row: Row) {
    if (typeof row.rowId === 'number') {
      return row.rowId;
    } else {
      throw new Error('row id should be number');
    }
  }

  useEffect(() => {
    fetchDriverHistory();
  }, []);

  return (
    <>
      <Dialog
        className={'dialog-position-end'}
        fullWidth={true}
        maxWidth={'md'}
        open={showTransaction}
        onClose={() => {
          setShowTransaction(false);
        }}>
        <DialogContent>
          <Table
            noOfRows={5}
            showMenu={false}
            rows={transactionArr}
            columns={transactionColDef}
            getRowId={getTransactionRowId}
            showLoading={false}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        className={'dialog-position-end'}
        fullWidth={true}
        maxWidth={'md'}
        open={showStocks}
        onClose={() => {
          setShowStocks(false);
        }}>
        <DialogContent>
          <Table
            noOfRows={5}
            showMenu={false}
            rows={stockArr}
            columns={stockColDef}
            getRowId={getStockRowId}
            showLoading={false}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        className={'dialog-position-end'}
        fullWidth={true}
        maxWidth={'md'}
        open={showAttachments}
        onClose={() => {
          setShowAttachments(false);
        }}>
        <DialogContent>
          <Table
            noOfRows={5}
            showMenu={false}
            rows={attachmentArr}
            columns={attachmentColDef(handleImageClick)}
            getRowId={getAttachmentRowId}
            showLoading={false}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        className={'dialog-position-end'}
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
        noOfRows={10}
        showMenu={true}
        rows={driverHistoryArr}
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
