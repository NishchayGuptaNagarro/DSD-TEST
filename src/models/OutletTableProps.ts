import {Row} from 'component/Table/propTypes/types.ts';
import {Dispatch, SetStateAction} from 'react';

export interface OutletTableProps {
  rows: Row[];
  setRows: Dispatch<SetStateAction<Row[]>>;
}
