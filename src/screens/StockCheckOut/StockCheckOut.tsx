import Stack from '@mui/material/Stack';

import {AxiosResponse} from 'axios';
import {ChangeEvent, useContext, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Outlet, useNavigate} from 'react-router';
import {useLocation} from 'react-router-dom';

import BlueButton from 'component/BlueButton/BlueButton.tsx';
import ScreenLayout from 'component/ScreenLayout/ScreenLayout.tsx';
import Timeline from 'component/Timeline/Timeline.tsx';

import {api} from 'api/api.ts';
import AlertDialog from 'component/AlertDialog/AlertDialog.tsx';
import BlueBorderButton from 'component/BlueBorderButton/BlueBorderButton.tsx';
import Header from 'component/Header/Header.tsx';
import PageDetails from 'component/PageDetails/PageDetails.tsx';
import timelineContext from 'context/timeline/timelineContext.ts';
import {createBrowserHistory} from 'history';
import {Driver} from 'models/Driver.ts';
import {checkApiError} from 'utilities/checkApiError.ts';
import {sendNotification} from 'utilities/sendNotification.ts';
import {
  deliveryRoutes,
  hybridRoutes,
  vanSellerRoutes,
} from 'utilities/timelineRoutes.ts';
import {
  deliverySteps,
  hybridSteps,
  vanSellerSteps,
} from 'utilities/timelineSteps.ts';
import {DriverApiResponse, StockCheckOutContext} from './propTypes/types.ts';
import './StockCheckOut.scss';
import {useStockCheckOutState} from './useStockCheckOutState.ts';

function StockCheckOut() {
  const {t} = useTranslation();
  const heading = t('createLoadingOrder.title');
  const subHeading = t('createLoadingOrder.subtitle');
  const navigate = useNavigate();
  const location = useLocation();
  const firstRender = useRef(true);
  const history = createBrowserHistory();

  const {
    driverArray,
    setDriverArray,
    selectedDriver,
    alertOpen,
    rows,
    setRows,
    setSelectedDriver,
    isSignatureLoaded,
    setAlertOpen,
    setIsDriverGridLoading,
    setIsSignatureLoaded,
    isDriverGridLoading,
    nextDisabled,
    setNextDisabled,
    setDriverType,
    driverType,
  } = useStockCheckOutState();
  const {
    currentStep,
    steps,
    decreaseSteps,
    increaseSteps,
    orderRoutes,
    updateOrderRoutes,
    updateStepsArray,
    setCurrentStep,
  } = useContext(timelineContext);

  function clearLocalStorage() {
    sessionStorage.removeItem('selected_driver');
    sessionStorage.removeItem('selected_driver_type');
    sessionStorage.removeItem('currentStep');
  }
  function handleDriverSelection(event: ChangeEvent<HTMLInputElement>) {
    setSelectedDriver(event.target.value);
    sessionStorage.setItem('selected_driver', event.target.value);
    sessionStorage.setItem('selected_driver_type', driverType);
  }
  function handleAlertClose() {
    clearLocalStorage();
    setAlertOpen(false);
    navigate('/home');
  }
  function handleTypeChange(type: 'VAN-SELLER' | 'DELIVERY' | 'HYBRID') {
    setDriverType(type);
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
    const selectedDriver = sessionStorage.getItem('selected_driver');
    const selectedDriverType = sessionStorage.getItem('selected_driver_type');

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
          user_id: sessionStorage.getItem('selected_driver'),
        },
      );
      console.log(response);
      checkApiError(response);
      sendNotification('Loading order created successfully');
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
    rows,
    setRows,
    driverType,
    handleTypeChange,
  };

  useEffect(() => {
    if (location.pathname == '/stock-check-out') {
      navigate('driver');
      setCurrentStep(1);
    }
    buttonDisabled();
    return () => {
      setNextDisabled(true);
    };
  });

  // API CALLS
  useEffect(() => {
    const unlisten = history.listen(listener => {
      if (listener.action == 'POP') {
        navigate('/stock-check-out');
      }
    });
    fetchDrivers();
    handleTypeChange(driverType);
    return () => {
      clearLocalStorage();
      unlisten();
    };
  }, []);
  //navigates to different routes from here
  useEffect(() => {
    if (firstRender.current) {
      navigate('driver');
      firstRender.current = false;
    } else {
      navigate(orderRoutes[currentStep - 1]);
    }
  }, [currentStep]);

  return (
    <ScreenLayout>
      <Header>
        <PageDetails heading={heading} subHeading={subHeading} />
      </Header>
      <AlertDialog
        messageText={'alert.text2'}
        isOpen={alertOpen}
        closeBtnText={'alert.btn1'}
        handleDismiss={handleAlertClose}
      />
      <Stack className={'select-driver-screen'}>
        <Stack
          spacing={2}
          sx={{
            p: 1.5,
            px: {
              md: 1,
              lg: 1.6,
              xl: 1,
            },
            minHeight: '70vh',
            position: 'relative',
          }}>
          <Timeline />
          {/*This outlet will display child components , all props are provided in context*/}
          <Outlet
            context={
              {
                ...contextObj,
              } satisfies StockCheckOutContext
            }></Outlet>
          <br />
          <br />
          <div className="buttons-group">
            <BlueBorderButton
              size={'small'}
              variant={'contained'}
              onClick={decreaseSteps}
              disabled={currentStep === 1}>
              {t('createLoadingOrder.back')}
            </BlueBorderButton>

            {currentStep === steps.length ? (
              <BlueButton
                size={'small'}
                variant={'contained'}
                disabled={!isSignatureLoaded}
                onClick={() => {
                  assignInitialStock();
                }}>
                {t('createLoadingOrder.finish')}
              </BlueButton>
            ) : (
              <BlueButton
                size={'small'}
                variant={'contained'}
                disabled={nextDisabled}
                onClick={increaseSteps}>
                {t('createLoadingOrder.next')}
              </BlueButton>
            )}
          </div>
        </Stack>
      </Stack>
    </ScreenLayout>
  );
}

export default StockCheckOut;

