import {GridColDef} from '@mui/x-data-grid';
import {Row} from 'component/Table/propTypes/types';

// Interface defining table component props
export interface TableDialogContentProps {
  rows: Row[];
  columns: GridColDef[];
  getRowId: (row: Row) => number | string;
  setShowDialog: (value: boolean) => void;
  selectedDriverId: string;
  dialogHeader: string;
  noOfRows?: number;
  showLoading?: boolean;
}
