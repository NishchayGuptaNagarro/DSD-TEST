import {DataGrid, gridClasses} from '@mui/x-data-grid';

import {TableProps} from './propTypes/types.ts';
import './Table.scss';

export default function Table({rows, columns, getRowId}: TableProps) {
  return (
    <DataGrid
      loading={rows.length === 0}
      rows={rows}
      columns={columns}
      getRowId={getRowId}
      getRowHeight={() => 'auto'} //Passing function to automatically set row height of each row
      getEstimatedRowHeight={() => 52} //giving estimated row height for performance enhancements
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      columnHeaderHeight={35}
      pageSizeOptions={[5]}
      autoHeight={true}
      disableColumnMenu
      disableRowSelectionOnClick
      sx={{
        color: '#344767',
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        [`& .${gridClasses.cell}`]: {
          paddingTop: 0.4,
          paddingBottom: 0.4,
          paddingLeft: 3,
        },
        [`& .${gridClasses.cell}:focus, & .${gridClasses.columnHeader}:focus`]:
          {
            outline: 0,
          },
        [`& .${gridClasses.columnHeader}`]: {
          paddingLeft: 3,
          fontWeight: 700,
          color: '#C1C2CD',
        },
        ['.MuiDataGrid-footerContainer']: {
          p: 0,
          height: 30,
          minHeight: 10,
        },
      }}
    />
  );
}
