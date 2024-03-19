import {DataGrid, gridClasses, GridColDef} from '@mui/x-data-grid';
import './Table.scss';
import {Row} from './propTypes/types.ts';
export default function Table({
	rows,
	columns,
	getRowId,
}: {
	rows: Row[];
	columns: GridColDef[];
	getRowId: (row: Row) => number;
}) {
	return (
		<DataGrid
			rows={rows}
			columns={columns}
			getRowId={getRowId}
			getRowHeight={() => 'auto'} //Passing function to automatically set row height of each row
			getEstimatedRowHeight={() => 200} //giving estimated row height for performance enhancements
			initialState={{
				pagination: {
					paginationModel: {
						pageSize: 5,
					},
				},
			}}
			columnHeaderHeight={78}
			pageSizeOptions={[5]}
			autoHeight={true}
			disableColumnMenu
			disableRowSelectionOnClick
			sx={{
				color: '#344767',
				backgroundColor: '#FFFFFF',
				borderRadius: 3,
				[`& .${gridClasses.cell}`]: {
					paddingTop: 1,
					paddingBottom: 2,
					paddingLeft: 3,
				},
				[`& .${gridClasses.cell}:focus, & .${gridClasses.columnHeader}:focus`]:
					{
						outline: 0,
					},
				[`& .${gridClasses.columnHeader}`]: {
					paddingLeft: 3,
					fontWeight: 700,
					fontSize: 18,
					color: '#C1C2CD',
				},
				[`& .${gridClasses.columnHeaders}`]: {
					paddingTop: 2,
				},
			}}
		/>
	);
}
