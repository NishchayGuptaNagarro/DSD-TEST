import {Row} from '../../../../component/Table/propTypes/types.ts';
import {Dispatch, SetStateAction} from 'react';

export interface OrderTableProps {
  isTableLoaded: boolean;
  handleTableLoaded: (value: boolean) => void;
  rows: Row[];
  setRows: Dispatch<SetStateAction<Row[]>>;
}
