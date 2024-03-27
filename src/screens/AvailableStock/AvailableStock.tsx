// This screen will display available stock page, it contains sidebar, table and heading
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {GridColDef} from '@mui/x-data-grid';
import ProductIcon from '../../component/ProductIcon/ProductIcon.tsx';
import Table from '../../component/Table/Table.tsx';
import PageHeading from '../../component/PageHeading/PageHeading.tsx';
import './AvailableStock.scss';
import DetailsCard from '../../component/DetailsCard/DetailsCard.tsx';
import {Product} from './propTypes/types.ts';
import {Row} from '../../component/Table/propTypes/types.ts';
import {format} from 'date-fns';

import dateIcon from '../../assets/Date.svg';
import managerIcon from '../../assets/Manager.svg';
import warehouseIcon from '../../assets/Warehouse.svg';
import Sidebar from '../../component/Sidebar/Sidebar.tsx';

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
      headerClassName: 'font-md',
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
      headerClassName: 'font-md',
      headerName: 'Product Description',
      flex: 1,
      cellClassName: 'productText font-sm',
      sortable: false,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      headerClassName: 'font-md',
      flex: 0.5,
      cellClassName: 'quantity font-sm',
      sortable: false,
    },
    {
      field: 'uom',
      headerName: 'UOM',
      headerClassName: 'font-md',
      flex: 0.4,
      valueGetter: () => {
        return 'Unit';
      },
      cellClassName: 'productText font-sm',
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
      <Grid item xs={2} padding={1}>
        <Sidebar />
        {/* <Box sx={{height: '100%', backgroundColor: '#3c3d43'}}></Box> */}
      </Grid>
<<<<<<< HEAD
      <Grid item xs={10} sx={{height:'100vh'}}>
=======
      <Grid item xs={10} sx={{height: '100vh', overflowY: 'scroll'}}>
>>>>>>> 6e07658f3423c848f6dfb587747365f6e02d794b
        <Stack>
          <Box padding={2} paddingBottom={0}>
            <PageHeading heading={heading} subHeading={subHeading} />
            <CardStack />
          </Box>
          <Box padding={2}>
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
        icon={warehouseIcon}
        mainInfo={'Supply Chain Solutions'}
        secondaryInfo={'1545-8895-448R'}
      />
      <DetailsCard
        heading={'Manager Name & ID'}
        icon={managerIcon}
        mainInfo={'Alexandra Gabrielle'}
        secondaryInfo={'55689'}
      />
      <DetailsCard
        heading={'Date'}
        icon={dateIcon}
        mainInfo={date}
        secondaryInfo={day}
      />
    </Stack>
  );
}
