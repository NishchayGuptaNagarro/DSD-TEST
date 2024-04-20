import {GridColDef} from '@mui/x-data-grid';
import {Row} from '../../Table/propTypes/types.ts';

export interface OrderTableProps {
  columns: GridColDef[];
  getRowId: (row: Row) => number;
}
