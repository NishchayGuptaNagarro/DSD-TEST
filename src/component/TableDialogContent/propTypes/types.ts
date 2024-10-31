import {GridColDef} from '@mui/x-data-grid';

//generic table row type, any type of rows passed to table should extend this interface
export interface Row {
  [key: string]: string | number | object; //using index signature syntax
}

// Interface defining table component props
export interface TableDialogContentProps {
  rows: Row[];
  columns: GridColDef[];
  getRowId: (row: Row) => number;
  setShowDialog: (value: boolean) => void;
  selectedDriverId: string;
  dialogHeader: string;
}
