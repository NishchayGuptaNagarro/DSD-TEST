import {DataGrid, gridClasses, GridLoadingOverlay} from '@mui/x-data-grid';

import {TableProps} from './propTypes/types.ts';
import './Table.scss';

export default function Table({rows, columns, getRowId}: TableProps) {
  return (
    <DataGrid
      loading={rows.length === 0}
      slots={{
        loadingOverlay: () => {
          return <GridLoadingOverlay sx={{backgroundColor: 'inherit'}} />;
        },
      }}
      rows={rows}
      columns={columns}
      getRowId={getRowId}
      autoHeight={true}
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
      disableColumnMenu
      disableRowSelectionOnClick
      sx={{
        minHeight: 270,
        color: '#344767',
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        '& .MuiDataGrid-row:last-child': {
          borderBottom: '1px solid lightgray',
        },
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
