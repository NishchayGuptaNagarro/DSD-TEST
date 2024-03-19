// This screen will display available stock page, it contains sidebar, table and heading
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import {GridColDef} from '@mui/x-data-grid';
import ProductIcon from '../../component/ProductIcon/ProductIcon.tsx';
import Table from '../../component/Table/Table..tsx';
import PageHeading from '../../component/PageHeading/PageHeading.tsx';
import './AvailableStock.scss';
import DetailsCard from '../../component/DetailsCard/DetailsCard.tsx';
import {Product} from './propTypes/types.ts';
import {Row} from '../../component/Table/propTypes/types.ts';
import {format} from 'date-fns';

function AvailableStock() {
	// Heading and subheading passed to 'Page Heading' component
	const heading = 'My Warehouse Available Stock';
	const subHeading =
		'Goods ready for immediate shipment in a warehouse.(sample text)';

	// Product rows passed to table component
	const rows: Product[] = [
		{
			productId: 145642,
			name: 'Coco-cola',
			imageSrc: '/Coco.jpg',
			description: 'Lorem ipsum dolor sit amet, consectetur adipi',
			quantity: 3000,
		},
		{
			productId: 27888,
			name: 'Pepsi',
			imageSrc: '/Sprite.png',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad corporis earum enim iusto',
			quantity: 2500,
		},
		{
			productId: 36545,
			name: 'Fanta',
			imageSrc: '/Coco.jpg',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad corporis earum enim iusto ',
			quantity: 2000,
		},
		{
			productId: 44512,
			name: 'Sprite',
			imageSrc: '/Sprite.png',
			description:
				'Lorem ipsum dolor sit amet,ont tempora. Aperiam at autem disti',
			quantity: 1500,
		},
		{
			productId: 58712,
			name: 'Mountain Dew',
			imageSrc: '/Coco.jpg',
			description:
				'Lorem ipsum dolor sit amet, consecteturgni mpora. Aperiam at autem disti',
			quantity: 1800,
		},
	];

	// columns definition array passed to table component
	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Product',
			flex: 0.8,
			// passing 'Product Icon' element to render cell function, so it is rendered instead of product name
			renderCell: params => {
				return (
					<ProductIcon
						productId={params.row.productId}
						productName={params.value}
						productImage={params.row.imageSrc}
					/>
				);
			},
			sortable: false,
		},
		{
			field: 'description',
			headerName: 'Product Description',
			flex: 1,
			cellClassName: 'productText',
			sortable: false,
		},
		{
			field: 'quantity',
			headerName: 'Quantity',
			flex: 0.5,
			cellClassName: 'quantity',
			sortable: false,
		},
		{
			field: 'uom',
			headerName: 'UOM',
			flex: 0.4,
			valueGetter: () => {
				return 'Unit';
			},
			cellClassName: 'productText',
			sortable: false,
		},
	];

	// This function returns a row's unique ID
	function getRowId(row: Row) {
		if (typeof row.productId === 'number') {
			return row.productId;
		} else {
			throw new Error('row id should be number');
		}
	}

	return (
		<Grid container>
			<Grid item xs={2}>
				<Box sx={{height: '100%', backgroundColor: '#3c3d43'}}></Box>
			</Grid>
			<Grid item xs={10}>
				<Stack>
					<Box padding={5} paddingBottom={0}>
						<PageHeading heading={heading} subHeading={subHeading} />
						<CardStack />
					</Box>
					<Box padding={5}>
						<Table rows={rows} columns={columns} getRowId={getRowId} />
					</Box>
				</Stack>
			</Grid>
		</Grid>
	);
}

export default AvailableStock;

// Component containing all cards
function CardStack() {
	const date = format(new Date(), 'dd-MMM-yyyy');
	const day = format(date, 'EEEE');
	return (
		<Stack direction="row" spacing={3}>
			<DetailsCard
				heading={'Warehouse Name & ID'}
				icon={<HomeIcon />}
				detail1={'Supply Chain Solutions'}
				detail2={'1545-8895-448R'}
			/>
			<DetailsCard
				heading={'Manager Name & ID'}
				icon={<PersonIcon />}
				detail1={'Alexandra Gabrielle'}
				detail2={'55689'}
			/>
			<DetailsCard
				heading={'Date'}
				icon={<CalendarIcon />}
				detail1={date}
				detail2={day}
			/>
		</Stack>
	);
}

// All icon components used in cards
// All icons are defined as svg, so they are resolution independent.
function HomeIcon() {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path d="M13.4933 15.2735H10.7667V18H13.4933V15.2735Z" fill="#929BAD" />
			<path
				d="M13.4933 11.9931H10.7667V14.7196H13.4933V11.9931Z"
				fill="#929BAD"
			/>
			<path d="M10.2129 15.2735H7.48641V18H10.2129V15.2735Z" fill="#929BAD" />
			<path
				d="M16.275 18V8.33511H1.72494V18H3.95286V11.4392H14.0471V18H16.275Z"
				fill="#929BAD"
			/>
			<path
				d="M1.72495 7.78126H9H16.2751H17.6611H18V6.83984L9 0L0 6.83984V7.78126H1.251H1.72495Z"
				fill="#929BAD"
			/>
		</svg>
	);
}

function PersonIcon() {
	return (
		<svg
			width="12"
			height="21"
			viewBox="0 0 12 21"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M10.1053 4.26562C10.1053 5.10929 9.86449 5.934 9.4134 6.63548C8.96231 7.33696 8.32115 7.88369 7.57102 8.20655C6.82088 8.5294 5.99545 8.61388 5.1991 8.44929C4.40276 8.2847 3.67127 7.87844 3.09714 7.28188C2.52301 6.68532 2.13202 5.92526 1.97362 5.09781C1.81522 4.27036 1.89651 3.41268 2.20723 2.63324C2.51795 1.8538 3.04413 1.1876 3.71924 0.718887C4.39435 0.250175 5.18806 0 6 0C7.08878 0 8.13297 0.449413 8.90286 1.24937C9.67274 2.04933 10.1053 3.13431 10.1053 4.26562ZM12 12.1603V21H0V12.1603C0 11.8561 0.0576671 11.5549 0.169709 11.2738C0.28175 10.9927 0.445972 10.7374 0.652998 10.5223C0.860023 10.3071 1.1058 10.1365 1.37629 10.0201C1.64678 9.90367 1.93669 9.84375 2.22947 9.84375H9.77053C10.0633 9.84375 10.3532 9.90367 10.6237 10.0201C10.8942 10.1365 11.14 10.3071 11.347 10.5223C11.554 10.7374 11.7182 10.9927 11.8303 11.2738C11.9423 11.5549 12 11.8561 12 12.1603ZM7.26316 16.4259L6.42316 12.9216C6.71056 12.6219 6.89482 12.232 6.94737 11.8125C6.94737 11.4516 6.52421 11.1562 6 11.1562C5.47579 11.1562 5.05263 11.4516 5.05263 11.8125C5.10518 12.232 5.28944 12.6219 5.57684 12.9216L4.73684 16.4259L6 18.375L7.26316 16.4259Z"
				fill="#929BAD"
			/>
		</svg>
	);
}

function CalendarIcon() {
	return (
		<svg
			width="17"
			height="18"
			viewBox="0 0 17 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M13.5 1.8H14.4C15.3941 1.8 16.2 2.60589 16.2 3.6V16.2C16.2 17.1941 15.3941 18 14.4 18H1.8C0.805887 18 0 17.1941 0 16.2V3.6C0 2.60589 0.805887 1.8 1.8 1.8H2.7V0.9C2.7 0.402944 3.10294 0 3.6 0C4.09706 0 4.5 0.402944 4.5 0.9V1.8H11.7V0.9C11.7 0.402944 12.1029 0 12.6 0C13.0971 0 13.5 0.402944 13.5 0.9V1.8ZM14.4 4.95V6.3H1.8V16.2H14.4V4.95ZM3.6 8.1H7.2V11.7H3.6V8.1Z"
				fill="#929BAD"
			/>
		</svg>
	);
}
