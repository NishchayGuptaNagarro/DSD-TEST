import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Sidebar from '../../component/Sidebar/Sidebar.tsx';
import PageHeading from '../../component/PageHeading/PageHeading.tsx';
import Paper from '@mui/material/Paper';
import {Container} from '@mui/material';
import {Driver} from './propTypes/types.ts';
import {ChangeEvent, useState} from 'react';
import DriverNameGrid from '../../component/DriverNameGrid/DriverNameGrid.tsx';
import {Row} from '../../component/Table/propTypes/types.ts';
import {GridColDef} from '@mui/x-data-grid';
import ProductIcon from '../../component/ProductIcon/ProductIcon.tsx';
import Table from '../../component/Table/Table.tsx';
import './SelectDriver.scss';
import Timeline from '../../component/Timeline/Timeline.tsx';
import DriverSignature from '../../component/DriverSignature/DriverSignature.tsx';

function SelectDriver() {
  const heading = 'Create Loading Order';
  const subHeading = 'To create a loading order, Please follow the steps';

  //---------------------------------------------------------------------MOCK DATA--------------------------------------------------------------------
  const driverArray: Driver[] = [
    {driverName: 'Max Verstappen', driverId: 'DRV002', driverType: 'vanSeller'},
    {driverName: 'Sergio Perez', driverId: 'DRV005', driverType: 'vanSeller'},
    {
      driverName: 'Daniel Ricciardo',
      driverId: 'DRV008',
      driverType: 'vanSeller',
    },
    {driverName: 'Pierre Gasly', driverId: 'DRV011', driverType: 'vanSeller'},
    {
      driverName: 'Alexander Albon',
      driverId: 'DRV014',
      driverType: 'vanSeller',
    },
    {
      driverName: 'Sebastian Vettel',
      driverId: 'DRV006',
      driverType: 'delivery',
    },
    {driverName: 'Valtteri Bottas', driverId: 'DRV009', driverType: 'delivery'},
    {
      driverName: 'Carlos Sainz Jr.',
      driverId: 'DRV012',
      driverType: 'delivery',
    },
    {driverName: 'Yuki Tsunoda', driverId: 'DRV015', driverType: 'delivery'},
    {driverName: 'Lewis Hamilton', driverId: 'DRV001', driverType: 'hybrid'},
    {driverName: 'Charles Leclerc', driverId: 'DRV004', driverType: 'hybrid'},
    {driverName: 'Lando Norris', driverId: 'DRV007', driverType: 'hybrid'},
    {driverName: 'Esteban Ocon', driverId: 'DRV010', driverType: 'hybrid'},
    {driverName: 'Lance Stroll', driverId: 'DRV013', driverType: 'hybrid'},
    {driverName: 'Fernando Alonso', driverId: 'DRV003', driverType: 'delivery'},
  ];
  const rows: Row[] = [
    {
      productId: 145642,
      name: 'Coco-cola',
      imageSrc: '/Coco.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipi',
      quantity: 3000,
      initialStock: 300,
      result: 20,
    },
    {
      productId: 27888,
      name: 'Pepsi',
      imageSrc: '/Sprite.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad corporis earum enim iusto',
      quantity: 2500,
      initialStock: 200,
      result: 10,
    },
    {
      productId: 36545,
      name: 'Fanta',
      imageSrc: '/Coco.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad corporis earum enim iusto',
      quantity: 2000,
      initialStock: 280,
      result: 40,
    },
    {
      productId: 44512,
      name: 'Sprite',
      imageSrc: '/Sprite.png',
      description:
        'Lorem ipsum dolor sit amet,ont tempora. Aperiam at autem disti',
      quantity: 1500,
      initialStock: 100,
      result: 0,
    },
    {
      productId: 58712,
      name: 'Mountain Dew',
      imageSrc: '/Coco.jpg',
      description:
        'Lorem ipsum dolor sit amet, consecteturgni mpora. Aperiam at autem disti',
      quantity: 1800,
      initialStock: 800,
      result: 90,
    },
  ];

  // -----------------------------------------END OF MOCK DATA-------------------------------------------------------------------
  const [selectedDriver, setSelectedDriver] = useState<string>('');
  function handleDriverSelection(event: ChangeEvent<HTMLInputElement>) {
    setSelectedDriver(event.target.value);
    console.log(event.target.value);
  }

  // Table Column Definition
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Product',
      flex: 0.6,
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
      flex: 0.8,
      cellClassName: 'productText font-sm',
      sortable: false,
    },
    {
      field: 'initialStock',
      headerName: 'Initial Stock',
      headerClassName: 'font-md',
      flex: 0.4,
      cellClassName: 'stock font-sm',
      sortable: false,
    },
    {
      field: 'uom',
      headerName: 'UOM',
      headerClassName: 'font-md',
      flex: 0.3,
      valueGetter: () => {
        return 'Unit';
      },
      cellClassName: 'productText font-sm',
      sortable: false,
    },
    {
      field: 'result',
      headerName: 'Result',
      headerClassName: 'font-md',
      flex: 0.3,
      cellClassName: 'stock font-sm',
      sortable: false,
    },
  ];
  function getRowId(row: Row) {
    if (typeof row.productId === 'number') {
      return row.productId;
    } else {
      throw new Error('row id should be number');
    }
  }
  return (
    <Grid container className={'select-driver-screen'}>
      <Grid item xs={2} padding={1}>
        <Sidebar />
      </Grid>
      <Grid item xs={10} sx={{height: '100vh', overflowY: 'scroll'}}>
        <Stack>
          <Box
            padding={2}
            paddingBottom={0}
            marginBottom={5}
            textAlign={'center'}>
            <PageHeading heading={heading} subHeading={subHeading} />
          </Box>
          <Container>
            <Paper elevation={1} sx={{p: 1.5}}>
              <Timeline />
              {/*<DriverNameGrid*/}
              {/*  driverArray={driverArray}*/}
              {/*  selectedDriverId={selectedDriver}*/}
              {/*  handleDriverSelection={handleDriverSelection}*/}
              {/*/>*/}
              {/*TODO add buttons here*/}
              {/*<Table rows={rows} columns={columns} getRowId={getRowId} />*/}
              <DriverSignature />
            </Paper>
          </Container>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default SelectDriver;
