import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {GridColDef} from '@mui/x-data-grid';

import {ChangeEvent, useContext, useEffect, useState} from 'react';
import {Outlet, useNavigate} from 'react-router';
import {AxiosResponse} from 'axios';

import Sidebar from '../../component/Sidebar/Sidebar.tsx';
import PageHeading from '../../component/PageHeading/PageHeading.tsx';
import ProductIcon from '../../component/ProductIcon/ProductIcon.tsx';
import Timeline from '../../component/Timeline/Timeline.tsx';
import LanguageSelect from '../../component/LanguageSelect/LanguageSelect.tsx';
import timelineContext from '../../context/timeline/timelineContext.ts';
import {api} from '../../axios/api.ts';
import {
  Driver,
  DriverApiResponse,
  DriverOutletContext,
  ProductApiResponse,
} from './propTypes/types.ts';
import {Row} from '../../component/Table/propTypes/types.ts';

import './SelectDriver.scss';

function SelectDriver() {
  const heading = 'Create Loading Order';
  const subHeading = 'To create a loading order, Please follow the steps';
  const [driverArray, setDriverArray] = useState<Driver[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<string>(
    localStorage.getItem('selected_driver') || '',
  );
  const navigate = useNavigate();
  const {
    currentStep,
    steps,
    decreaseSteps,
    increaseSteps,
    stepsComplete,
    orderRoutes,
  } = useContext(timelineContext) || {};

  async function fetchDrivers() {
    let response: AxiosResponse<DriverApiResponse>;
    let driverData: Driver[];
    try {
      response = await api.get('/warehouse/drivers');
      console.log(response);

      driverData = response.data.data.map(driver => {
        const parsedRes: Driver = {
          driverName: driver.username,
          driverId: driver.user_id,
          driverType: driver.business_role_id,
        };
        return parsedRes;
      });
      setDriverArray(driverData);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchRows() {
    let response: AxiosResponse<ProductApiResponse>;
    let products: Row[];
    try {
      response = await api.get(
        `/warehouse/vanseller-dashboard-for-warehouse?user_id=${localStorage.getItem('selected_driver')}`,
      );

      products = response.data.data.map(product => {
        const parsedRes: Row = {
          productId: Number(product.product_id),
          name: product.description,
          description: product.description,
          imageSrc: 'data:image/png;base64,' + product.img.product_image,
          initialStock: product.quantity,
        };

        return parsedRes;
      });
      setRows(products);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  function handleDriverSelection(event: ChangeEvent<HTMLInputElement>) {
    setSelectedDriver(event.target.value);
    localStorage.setItem('selected_driver', event.target.value);
    fetchRows();
  }
  function getRowId(row: Row) {
    if (typeof row.productId === 'number') {
      return row.productId;
    } else {
      throw new Error('row id should be number');
    }
  }

  // API CALLS
  useEffect(() => {
    fetchDrivers();
  }, []);

  useEffect(() => {
    navigate(`${orderRoutes[currentStep - 1]}`);
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
  }, [currentStep]);

  // Table Column Definition
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Product',
      flex: 0.7,
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
      cellClassName: 'productText font-xsm',
      sortable: false,
    },
    {
      field: 'initialStock',
      headerName: 'Initial Stock',
      headerClassName: 'font-md',
      flex: 0.5,
      cellClassName: 'stock font-sm',
      sortable: false,
    },
    {
      field: 'uom',
      headerName: 'UOM',
      headerClassName: 'font-md',
      flex: 0.5,
      valueGetter: () => {
        return 'Unit';
      },
      cellClassName: 'productText font-sm',
      sortable: false,
    },
  ];
  if (localStorage.getItem('user')) {
    return (
      <Grid container className={'select-driver-screen'}>
        <Grid item xs={2} sx={{padding: 1}}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} sx={{height: '100vh', overflowY: 'scroll'}}>
          <Stack>
            <span className={'language-select'}>
              <LanguageSelect />
            </span>
            <br />
            <br />
            <Box
              padding={2}
              paddingBottom={0}
              marginBottom={5}
              textAlign={'center'}>
              <PageHeading heading={heading} subHeading={subHeading} />
            </Box>
            <Paper
              elevation={1}
              sx={{p: 1.5, minHeight: 400, position: 'relative'}}>
              <Timeline />
              {/*This outlet will display child components , all props are provided in context*/}
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
  } else {
    return null;
  }
}

export default SelectDriver;
