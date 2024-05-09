import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {ChangeEvent, useContext, useEffect, useRef} from 'react';
import {Outlet} from 'react-router';
import {AxiosResponse} from 'axios';

import ScreenLayout from 'component/ScreenLayout/ScreenLayout.tsx';
import LanguageSelect from 'component/LanguageSelect/LanguageSelect.tsx';
import PageHeading from 'component/PageHeading/PageHeading.tsx';
import Timeline from 'component/Timeline/Timeline.tsx';

import BlackButton from 'component/BlackButton/BlackButton.tsx';
import timelineContext from 'context/timeline/timelineContext.ts';
import {checkInSteps} from 'utilities/timelineSteps.ts';
import {checkInRoutes} from 'utilities/timelineRoutes.ts';
import {StockCheckInContext} from './propTypes/types.ts';
import {useStockCheckInState} from './useStockCheckInState.ts';
import {driverTypes} from 'models/driverTypes.ts';
import {api} from 'axios/api.ts';
import {Driver} from 'models/driver.ts';
import {checkApiError} from 'utilities/checkApiError.ts';
import './StockCheckIn.scss';
import {DriverApiResponse} from '../StockCheckOut/propTypes/types.ts';

function StockCheckIn() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const heading = t('stockcheckin.heading');
  const subHeading = t('stockcheckin.subheading');
  const firstRender = useRef(true);
  const {
    currentStep,
    steps,
    decreaseSteps,
    increaseSteps,
    orderRoutes,
    updateOrderRoutes,
    updateStepsArray,
  } = useContext(timelineContext);

  const {
    isDriverGridLoading,
    driverArray,
    setDriverArray,
    selectedDriver,
    setSelectedDriver,
    driverType,
    setIsDriverGridLoading,
    setDriverType,
    nextDisabled,
    setNextDisabled,
    setRows,
    rows,
    isSignatureDone,
    setIsSignatureDone,
  } = useStockCheckInState();

  function handleDriverSelection(event: ChangeEvent<HTMLInputElement>) {
    setSelectedDriver(event.target.value);
    localStorage.setItem('selected_driver', event.target.value);
    localStorage.setItem('selected_driver_type', driverType);
  }
  function buttonDisabled() {
    if (localStorage.getItem('selected_driver')) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  }

  //Add logic for setting routes here
  function handleTypeChange(type: driverTypes) {
    setDriverType(type);
    updateStepsArray(checkInSteps);
    updateOrderRoutes(checkInRoutes);
  }
  function clearLocalStorage() {
    localStorage.removeItem('selected_driver');
    localStorage.removeItem('selected_driver_type');
    localStorage.removeItem('currentStep');
  }

  const contextObj = {
    isDriverGridLoading,
    driverArray,
    selectedDriverId: selectedDriver,
    driverType,
    handleTypeChange,
    handleDriverSelection,
    rows,
    setRows,
    isSignatureDone,
    setIsSignatureDone,
  };

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

  useEffect(() => {
    buttonDisabled();
    return () => {
      setNextDisabled(true);
    };
  });

  useEffect(() => {
    fetchDrivers();
    handleTypeChange(driverType);
    return () => {
      clearLocalStorage();
    };
  }, []);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      navigate(orderRoutes[currentStep - 1]);
    }
  }, [currentStep]);
  return (
    <ScreenLayout>
      <Stack className={'stock-check-in'}>
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

          <Outlet
            context={
              {
                ...contextObj,
              } satisfies StockCheckInContext
            }></Outlet>
          <br />
          <br />
          <div className="buttons-group">
            <BlackButton
              size={'small'}
              variant={'contained'}
              onClick={() => {
                decreaseSteps();
                setRows([]);
              }}
              disabled={currentStep === 1}>
              {t('createLoadingOrder.back')}
            </BlackButton>
            {currentStep === steps.length ? (
              <BlackButton
                size={'small'}
                variant={'contained'}
                disabled={!isSignatureDone}
                onClick={() => {
                  navigate('/');
                }}>
                {t('createLoadingOrder.finish')}
              </BlackButton>
            ) : (
              <BlackButton
                size={'small'}
                variant={'contained'}
                disabled={nextDisabled}
                onClick={() => {
                  increaseSteps();
                  setRows([]);
                }}>
                {t('createLoadingOrder.next')}
              </BlackButton>
            )}
          </div>
        </Paper>
      </Stack>
    </ScreenLayout>
  );
}

export default StockCheckIn;
