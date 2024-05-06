import {GridColDef} from '@mui/x-data-grid';
import {Row} from '../../../../component/Table/propTypes/types.ts';
import {Dispatch, SetStateAction} from 'react';

export interface OrderTableProps {
  columns: GridColDef[];
  getRowId: (row: Row) => number;
  isTableLoaded: boolean;
  handleTableLoaded: (value: boolean) => void;
  rows: Row[];
  setRows: Dispatch<SetStateAction<Row[]>>;
}
