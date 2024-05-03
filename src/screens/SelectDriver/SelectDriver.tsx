import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {GridColDef} from '@mui/x-data-grid';

import {ChangeEvent, useContext, useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router';
import {AxiosResponse} from 'axios';

import Sidebar from '../../component/Sidebar/Sidebar.tsx';
import PageHeading from '../../component/PageHeading/PageHeading.tsx';
import ProductIcon from '../../component/ProductIcon/ProductIcon.tsx';
import Timeline from '../../component/Timeline/Timeline.tsx';
import LanguageSelect from '../../component/LanguageSelect/LanguageSelect.tsx';
import timelineContext from '../../context/timeline/timelineContext.ts';
import {api} from '../../axios/api.ts';
import {DriverApiResponse, DriverOutletContext} from './propTypes/types.ts';
import {Row} from '../../component/Table/propTypes/types.ts';

import './SelectDriver.scss';
import {useTranslation} from 'react-i18next';
import AlertDialog from '../../component/AlertDialog/AlertDialog.tsx';
import Button from '@mui/material/Button';
import {styled} from '@mui/material';
import {Driver} from '../../models/driver.ts';
import {checkApiError} from '../../utilities/checkApiError.ts';
import {useLocation} from 'react-router-dom';
import {
  deliverySteps,
  hybridSteps,
  vanSellerSteps,
} from '../../utilities/timelineSteps.ts';
import {
  deliveryRoutes,
  hybridRoutes,
  vanSellerRoutes,
} from '../../utilities/timelineRoutes.ts';
import {useSelectDriverState} from './useSelectDriverState.ts';

// Table Column Definition
const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'table.product',
    flex: 0.7,
    headerClassName: 'font-md',
    // passing 'Product Icon' element to render cell function, so it is rendered instead of product name
    renderCell: params => {
      return (
        <ProductIcon
          productId={params.row.externalId}
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
    headerName: 'table.description',
    flex: 0.8,
    cellClassName: 'productText font-xsm',
    sortable: false,
  },
  {
    field: 'initialStock',
    headerName: 'table.initialStock',
    headerClassName: 'font-md',
    flex: 0.5,
    cellClassName: 'stock font-sm',
    sortable: false,
  },
  {
    field: 'uom',
    headerName: 'table.uom',
    headerClassName: 'font-md',
    flex: 0.5,
    cellClassName: 'productText font-sm',
    sortable: false,
  },
];

function SelectDriver() {
  const {t} = useTranslation();
  const BlackButton = styled(Button)({
    minWidth: 80,
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: 'black',
    },
  });
  const heading = t('createLoadingOrder.title');
  const subHeading = t('createLoadingOrder.subtitle');
  const location = useLocation();
  const navigate = useNavigate();
  const {
    driverArray,
    setDriverArray,
    selectedDriver,
    alertOpen,
    alertText,
    rows,
    setRows,
    setSelectedDriver,
    isSignatureLoaded,
    isTableLoaded,
    setIsTableLoaded,
    setAlertOpen,
    setAlertText,
    setIsDriverGridLoading,
    setIsSignatureLoaded,
    isDriverGridLoading,
    nextDisabled,
    setNextDisabled,
    setDriverType,
    driverType,
  } = useSelectDriverState();

  const {
    currentStep,
    steps,
    decreaseSteps,
    increaseSteps,
    orderRoutes,
    updateOrderRoutes,
    updateStepsArray,
  } = useContext(timelineContext);
  function handleTableLoaded(value: boolean) {
    setIsTableLoaded(value);
  }
  function handleDriverSelection(event: ChangeEvent<HTMLInputElement>) {
    setSelectedDriver(event.target.value);
    localStorage.setItem('selected_driver', event.target.value);
  }
  function handleAlertClose() {
    localStorage.removeItem('selected_driver');
    localStorage.removeItem('currentStep');
    localStorage.removeItem('selected_type');
    setAlertOpen(false);
    navigate('/home');
  }
  function handleTypeChange(type: 'VAN-SELLER' | 'DELIVERY' | 'HYBRID') {
    setDriverType(type);
    localStorage.setItem('selected_type', type);
    switch (type) {
      case 'VAN-SELLER': {
        updateStepsArray(vanSellerSteps);
        updateOrderRoutes(vanSellerRoutes);
        break;
      }
      case 'DELIVERY': {
        updateStepsArray(deliverySteps);
        updateOrderRoutes(deliveryRoutes);
        break;
      }
      case 'HYBRID': {
        updateStepsArray(hybridSteps);
        updateOrderRoutes(hybridRoutes);
        break;
      }
      default:
        return;
    }
  }

  async function fetchDrivers() {
    let response: AxiosResponse<DriverApiResponse>;
    let driverData: Driver[];
    try {
      response = await api.get('/warehouse/drivers');
      console.log(response);
      checkApiError(response);
      driverData = response.data.data.map(driver => {
        const parsedRes: Driver = {
          driverName: driver.username,
          driverId: driver.user_id,
          driverType: driver.business_role_id,
        };
        return parsedRes;
      });
      setDriverArray(driverData);
      setIsDriverGridLoading(false);
    } catch (error) {
      console.log(error);
      setIsDriverGridLoading(false);
    }
  }

  async function assignInitialStock() {
    try {
      const response: AxiosResponse = await api.post(
        '/warehouse/assign-initial-stock',
        {
          user_id: localStorage.getItem('selected_driver'),
        },
      );
      console.log(response);
      checkApiError(response);
      setAlertText(response.data.msg);
      setAlertOpen(true);
    } catch (error) {
      console.log(error);
    }
  }
  function getRowId(row: Row) {
    if (typeof row.productId === 'number') {
      return row.productId;
    } else {
      throw new Error('row id should be number');
    }
  }

  function buttonDisabled() {
    if (currentStep == 2) {
      setNextDisabled(rows.length === 0);
    } else if (!localStorage.getItem('selected_driver')) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }
  }

  useEffect(() => {
    if (location.pathname == '/createloadingorder') {
      navigate(`${orderRoutes[currentStep - 1]}`);
    }
    buttonDisabled();
    return () => {
      setNextDisabled(true);
    };
  });

  // API CALLS
  useEffect(() => {
    fetchDrivers();
    handleTypeChange(driverType);
  }, []);

  useEffect(() => {
    navigate(orderRoutes[currentStep - 1]);
  }, [currentStep]);

  return (
    <Grid container className={'select-driver-screen'}>
      <AlertDialog
        messageText={alertText}
        isOpen={alertOpen}
        closeBtnText={'Okay'}
        handleDismiss={handleAlertClose}
      />
      <Grid item xs={2} height={'100vh'} sx={{padding: 1}}>
        <Sidebar />
      </Grid>
      <Grid
        item
        className={'hide-scrollbar'}
        minHeight={400}
        xs={10}
        sx={{maxHeight: '100vh', overflowY: 'scroll'}}>
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
            sx={{p: 1.5, minHeight: '70vh', position: 'relative'}}>
            <Timeline />
            {/*This outlet will display child components , all props are provided in context*/}
            <Outlet
              context={
                {
                  driverArray,
                  selectedDriverId: selectedDriver,
                  handleDriverSelection,
                  columns,
                  getRowId,
                  isSignatureLoaded,
                  setIsSignatureLoaded,
                  isDriverGridLoading,
                  isTableLoaded,
                  handleTableLoaded,
                  rows,
                  setRows,
                  driverType,
                  handleTypeChange,
                } satisfies DriverOutletContext
              }></Outlet>
            <br />
            <br />
            <div className="buttons-group">
              <BlackButton
                size={'small'}
                variant={'contained'}
                onClick={decreaseSteps}
                disabled={currentStep === 1}>
                {t('createLoadingOrder.back')}
              </BlackButton>

              {currentStep === steps.length ? (
                <BlackButton
                  size={'small'}
                  variant={'contained'}
                  disabled={!isSignatureLoaded}
                  onClick={() => {
                    assignInitialStock();
                  }}>
                  {t('createLoadingOrder.finish')}
                </BlackButton>
              ) : (
                <BlackButton
                  size={'small'}
                  variant={'contained'}
                  disabled={nextDisabled}
                  onClick={increaseSteps}>
                  {t('createLoadingOrder.next')}
                </BlackButton>
              )}
            </div>
          </Paper>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default SelectDriver;
