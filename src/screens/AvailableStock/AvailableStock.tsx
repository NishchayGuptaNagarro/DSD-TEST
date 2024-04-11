// This screen will display available stock page, it contains sidebar, table and heading
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {GridColDef} from '@mui/x-data-grid';

import {format} from 'date-fns';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import ProductIcon from '../../component/ProductIcon/ProductIcon.tsx';
import Table from '../../component/Table/Table.tsx';
import PageHeading from '../../component/PageHeading/PageHeading.tsx';
import Sidebar from '../../component/Sidebar/Sidebar.tsx';
import DetailsCard from '../../component/DetailsCard/DetailsCard.tsx';
import LanguageSelect from '../../component/LanguageSelect/LanguageSelect.tsx';
import {Product} from './propTypes/types.ts';
import {Row} from '../../component/Table/propTypes/types.ts';
import {api} from '../../axios/api.ts';
import './AvailableStock.scss';

import dateIcon from '../../assets/Date.svg';
import managerIcon from '../../assets/Manager.svg';
import warehouseIcon from '../../assets/Warehouse.svg';
import productJSON from '../../axios/products 1.json';

// This column definiton should not be redefined at every render so moved it outside
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

function AvailableStock() {
  // Heading and subheading passed to 'Page Heading' component
  const heading = 'My Warehouse Available Stock';
  const subHeading =
    'Goods ready for immediate shipment in a warehouse.(sample text)';

  // Product rows passed to table component
  const [rows, setRows] = useState<Product[]>([]);
  const navigator = useNavigate();
  async function fetchRows() {
    let response;
    try {
      response = await api.get('/account/initialstock');
      console.log(response);
    } catch (error) {
      console.log(error);
      response = productJSON.data.map(product => {
        const parsedRes: Product = {
          productId: Number(product.product_id),
          name: product.description,
          description: product.description,
          quantity: Number(product.quantity),
          imageSrc: 'data:image/png;base64,' + product.img.product_image,
        };

        return parsedRes;
      });

      setRows(response);
    }
  }

  // This function returns a row's unique ID
  function getRowId(row: Row) {
    if (typeof row.productId === 'number') {
      return row.productId;
    } else {
      throw new Error('row id should be number');
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigator('/');
    }
    fetchRows();
  }, []);

  if (localStorage.getItem('user')) {
    return (
      <Grid container>
        <Grid item xs={2} padding={1}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} sx={{height: '100vh', overflowY: 'scroll'}}>
          <Stack>
            <Box padding={2} paddingBottom={0} position={'relative'}>
              <span className={'avl-language-select'}>
                <LanguageSelect />
              </span>
              {/*THESE br will be removed when language selection is added to separate component*/}
              <br />
              <br />
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
  } else {
    return null;
  }
}

export default AvailableStock;

// Component containing all cards
function CardStack() {
  const date = format(new Date(), 'dd-MMM-yyyy');
  const day = format(date, 'EEEE');
  const user = JSON.parse(
    localStorage.getItem('user') || '{username:"",employee_id:""}',
  );
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
        mainInfo={user.username}
        secondaryInfo={user.employee_id}
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
