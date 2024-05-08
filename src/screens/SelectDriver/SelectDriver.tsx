import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import {ChangeEvent, useContext, useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router';
import {AxiosResponse} from 'axios';

import Sidebar from '../../component/Sidebar/Sidebar.tsx';
import PageHeading from '../../component/PageHeading/PageHeading.tsx';

import Timeline from '../../component/Timeline/Timeline.tsx';
import LanguageSelect from '../../component/LanguageSelect/LanguageSelect.tsx';
import timelineContext from '../../context/timeline/timelineContext.ts';
import {api} from '../../axios/api.ts';
import {DriverApiResponse, DriverOutletContext} from './propTypes/types.ts';

import './SelectDriver.scss';
import {useTranslation} from 'react-i18next';
import AlertDialog from '../../component/AlertDialog/AlertDialog.tsx';
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
import BlackButton from '../../component/BlackButton/BlackButton.tsx';

function SelectDriver() {
  const {t} = useTranslation();
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

  function clearLocalStorage() {
    localStorage.removeItem('selected_driver');
    localStorage.removeItem('selected_driver_type');
    localStorage.removeItem('currentStep');
    localStorage.removeItem('selected_type');
  }
  function handleTableLoaded(value: boolean) {
    setIsTableLoaded(value);
  }
  function handleDriverSelection(event: ChangeEvent<HTMLInputElement>) {
    setSelectedDriver(event.target.value);
    localStorage.setItem('selected_driver', event.target.value);
    localStorage.setItem(
      'selected_driver_type',
      localStorage.getItem('selected_type') || '',
    );
  }
  function handleAlertClose() {
    clearLocalStorage();
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

  function buttonDisabled() {
    const selectedDriver = localStorage.getItem('selected_driver');
    const selectedDriverType = localStorage.getItem('selected_driver_type');

    switch (driverType) {
      case 'VAN-SELLER': {
        if (currentStep == 2) {
          setNextDisabled(rows.length === 0);
        } else if (!selectedDriver) {
          setNextDisabled(true);
        } else {
          setNextDisabled(selectedDriverType !== 'VAN-SELLER');
        }
        break;
      }
      case 'DELIVERY': {
        if (currentStep == 2) {
          setNextDisabled(true);
        } else if (!selectedDriver) {
          setNextDisabled(true);
        } else {
          setNextDisabled(selectedDriverType !== 'DELIVERY');
        }
        break;
      }
      case 'HYBRID': {
        setNextDisabled(true);
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

  const contextObj = {
    driverArray,
    selectedDriverId: selectedDriver,
    handleDriverSelection,
    isSignatureLoaded,
    setIsSignatureLoaded,
    isDriverGridLoading,
    isTableLoaded,
    handleTableLoaded,
    rows,
    setRows,
    driverType,
    handleTypeChange,
  };

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
                  ...contextObj,
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
