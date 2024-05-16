import {TransactionHistory} from 'models/TransactionHistory.ts';
import {Stock} from 'models/Stock.ts';
import {Attachment} from 'models/Attachment.ts';
import {Row} from 'component/Table/propTypes/types.ts';

export interface AllDriverHistory extends Row {
  rowId: number;
  driverId: string;
  date: string;
  transaction: TransactionHistory[];
  stock: Stock[];
  attachment: Attachment[];
}

export interface AllOrderButtonProps {
  orders: TransactionHistory[];
  handleOrdersClick: (orders: TransactionHistory[]) => void;
}
export interface AllStockButtonProps {
  stocks: Stock[];
  handleStocksClick: (stocks: Stock[]) => void;
}
export interface AllAttachmentsButtonProps {
  attachments: Attachment[];
  handleAttachmentsClick: (attachments: Attachment[]) => void;
}
