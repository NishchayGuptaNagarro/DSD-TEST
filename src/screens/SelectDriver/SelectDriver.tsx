import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Sidebar from '../../component/Sidebar/Sidebar.tsx';
import PageHeading from '../../component/PageHeading/PageHeading.tsx';
import Paper from '@mui/material/Paper';

import {ApiDriverData, Driver, DriverOutletContext} from './propTypes/types.ts';
import {ChangeEvent, useContext, useEffect, useState} from 'react';

import {Row} from '../../component/Table/propTypes/types.ts';
import {GridColDef} from '@mui/x-data-grid';
import ProductIcon from '../../component/ProductIcon/ProductIcon.tsx';

import './SelectDriver.scss';
import Timeline from '../../component/Timeline/Timeline.tsx';
import timelineContext from '../../context/timeline/timelineContext.ts';

import {Outlet, useNavigate} from 'react-router';
import {api} from '../../axios/api.ts';
import driverJSON from '../../axios/driver.json';
import {AxiosResponse} from 'axios';

function SelectDriver() {
  const heading = 'Create Loading Order';
  const subHeading = 'To create a loading order, Please follow the steps';
  const [driverArray, setDriverArray] = useState<Driver[]>([]);

  async function fetchDrivers() {
    let response: AxiosResponse<ApiDriverData>;
    let driverData: Driver[];
    try {
      response = await api.get('/warehouse/drivers');
      console.log(response);
    } catch (error) {
      console.log(error);
      driverData = driverJSON.data.map(driver => {
        const parsedRes: Driver = {
          driverName: driver.username,
          driverId: driver.employee_id,
          driverType: driver.business_role_id as
            | 'VAN-SELLER'
            | 'DELIVERY'
            | 'HYBRID',
        }; //Type assertion will be removed when real APIs are used
        return parsedRes;
      });
      setDriverArray(driverData);
    }
  }

  useEffect(() => {
    fetchDrivers();
  }, []);
  //---------------------------------------------------------------------MOCK DATA--------------------------------------------------------------------
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
  const navigate = useNavigate();
  const {
    currentStep,
    steps,
    decreaseSteps,
    increaseSteps,
    stepsComplete,
    orderRoutes,
  } = useContext(timelineContext) || {};

  useEffect(() => {
    navigate(`${orderRoutes[currentStep - 1]}`);
  }, [currentStep]);

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
      <Grid item xs={2} sx={{padding: 1}}>
        {' '}
        {/* Moved padding to sx prop */}
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
          <Paper
            elevation={1}
            sx={{p: 1.5, minHeight: 430, position: 'relative'}}>
            <Timeline />
            {/*This outlet will display child components all props are provided in context*/}
            <Outlet
              context={
                {
                  driverArray: driverArray,
                  selectedDriverId: selectedDriver,
                  handleDriverSelection: handleDriverSelection,
                  rows: rows,
                  columns: columns,
                  getRowId: getRowId,
                } satisfies DriverOutletContext
              }></Outlet>
            <br />
            <br />
            <div className="buttons-group">
              <button
                className="btn-item"
                onClick={() => {
                  currentStep > 1 ? decreaseSteps() : stepsComplete();
                }}
                disabled={currentStep === 1}>
                Back
              </button>

              <button
                className="btn-item"
                onClick={() => {
                  currentStep === steps.length
                    ? stepsComplete()
                    : increaseSteps();
                }}>
                {currentStep === steps.length ? 'Finish' : 'Next'}
              </button>
            </div>
          </Paper>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default SelectDriver;
