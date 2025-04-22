import {GridColDef} from '@mui/x-data-grid';

//generic table row type, any type of rows passed to table should extend this interface
export interface Row {
  [key: string]: string | number | object; //using index signature syntax
}

// Interface defining table component props
export interface TableProps {
  rows: Row[];
  columns: GridColDef[];
  getRowId: (row: Row) => string | number;
  showLoading: boolean;
  showMenu: boolean;
  noOfRows: number;
  minHeight?: number;
  withBorder?: boolean;
  handlePageChange?: (page: number) => void;
  page?: number;
  pageCount?: number;
}

export interface CustomPaginationProps {
  page?: number;
  pageCount?: number;
  handlePageChange?: (value: number) => void;
}

