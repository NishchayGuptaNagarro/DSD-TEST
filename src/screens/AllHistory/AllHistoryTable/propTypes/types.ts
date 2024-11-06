import {Row} from 'component/Table/propTypes/types.ts';
import {Attachment} from 'models/Attachment.ts';
import {Stock} from 'models/Stock.ts';
import {TransactionHistory} from 'models/TransactionHistory.ts';

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
  driverId: string;
  handleOrdersClick: (orders: TransactionHistory[], driverId: string) => void;
}
export interface AllStockButtonProps {
  stocks: Stock[];
  driverId: string;
  handleStocksClick: (stocks: Stock[], driverId: string) => void;
}
export interface AllAttachmentsButtonProps {
  attachments: Attachment[];
  driverId: string;
  handleAttachmentsClick: (attachments: Attachment[], driverId: string) => void;
}

