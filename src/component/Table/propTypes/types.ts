//generic table row type, any type of rows passed to table should extend this interface
import {GridColDef} from '@mui/x-data-grid';

export interface Row {
  [key: string]: string | number; //using index signature syntax
}

// Interface defining table component props
export interface TableProps {
  rows: Row[];
  columns: GridColDef[];
  getRowId: (row: Row) => number;
}
