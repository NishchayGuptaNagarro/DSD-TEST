// This screen will display available stock page, it contains sidebar, table and heading
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {GridColDef} from '@mui/x-data-grid';

import {format} from 'date-fns';
import {useEffect, useState} from 'react';

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
import {useTranslation} from 'react-i18next';

// This column definiton should not be redefined at every render so moved it outside
// columns definition array passed to table component

function AvailableStock() {
  const {t} = useTranslation();
  // Heading and subheading passed to 'Page Heading' component
  const heading = t('availablestock.pageHeading');
  const subHeading = t('availablestock.subHeading');

  // Product rows passed to table component
  const [rows, setRows] = useState<Product[]>([]);
  async function fetchRows() {
    let response;
    try {
      response = await api.get('/not-deployed-yet');
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

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('table.product'),
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
      headerName: t('table.description'),
      flex: 1,
      cellClassName: 'productText font-sm',
      sortable: false,
    },
    {
      field: 'quantity',
      headerName: t('table.quantity'),
      headerClassName: 'font-md',
      flex: 0.5,
      cellClassName: 'quantity font-sm',
      sortable: false,
    },
    {
      field: 'uom',
      headerName: t('table.uom'),
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

  useEffect(() => {
    fetchRows();
  }, []);

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
}

export default AvailableStock;

// Component containing all cards
function CardStack() {
  const {t} = useTranslation();
  const date = format(new Date(), 'dd-MMM-yyyy');
  const day = format(date, 'EEEE');
  const user = JSON.parse(
    localStorage.getItem('user') || '{username:"",employee_id:""}',
  );
  return (
    <Stack direction="row" spacing={3}>
      <DetailsCard
        heading={t('availablestock.card1Heading')}
        icon={warehouseIcon}
        mainInfo={t('availablestock.card1MainInfo')}
        secondaryInfo={'1545-8895-448R'}
      />
      <DetailsCard
        heading={t('availablestock.card2Heading')}
        icon={managerIcon}
        mainInfo={user.username}
        secondaryInfo={user.employee_id}
      />
      <DetailsCard
        heading={t('availablestock.card3Heading')}
        icon={dateIcon}
        mainInfo={date}
        secondaryInfo={day}
      />
    </Stack>
  );
}
