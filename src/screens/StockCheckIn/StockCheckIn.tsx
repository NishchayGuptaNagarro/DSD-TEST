import Stack from '@mui/material/Stack';

import {useContext, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Outlet} from 'react-router';
import {useLocation, useNavigate} from 'react-router-dom';

import {AxiosResponse} from 'axios';
import ScreenLayout from 'component/ScreenLayout/ScreenLayout.tsx';
import Timeline from 'component/Timeline/Timeline.tsx';

import Box from '@mui/material/Box';
import {api} from 'api/api.ts';
import confirmAnimation from 'assets/LOTTIE/ConfirmAnimation.json';
import BlueBorderButton from 'component/BlueBorderButton/BlueBorderButton.tsx';
import BlueButton from 'component/BlueButton/BlueButton.tsx';
import Header from 'component/Header/Header.tsx';
import InfoAlertDialog from 'component/InfoAlertDialog/InfoAlertDialog.tsx';
import PageDetails from 'component/PageDetails/PageDetails.tsx';
import timelineContext from 'context/timeline/timelineContext.ts';
import {createBrowserHistory} from 'history';
import {Attachment} from 'models/Attachment.ts';
import {Driver} from 'models/Driver.ts';
import {DriverHistoryResponse} from 'models/DriverHistoryResponse.ts';
import {driverTypes} from 'models/driverTypes.ts';
import {Stock} from 'models/Stock.ts';
import {
  DeliveryTransactionHistory,
  TransactionHistory,
} from 'models/TransactionHistory.ts';
import Lottie from 'react-lottie';
import {driverRoles} from 'utilities/enums.ts';
import {getParsedOrders} from 'utilities/getParsedOrders.ts';
import {sendNotification} from 'utilities/sendNotification.ts';
import {checkInRoutes} from 'utilities/timelineRoutes.ts';
import {checkInSteps} from 'utilities/timelineSteps.ts';
import {
  PendingCheckInResponse,
  StockCheckInContext,
} from './propTypes/types.ts';
import './StockCheckIn.scss';
import {useStockCheckInState} from './useStockCheckInState.ts';

function StockCheckIn() {
  const {t} = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const history = createBrowserHistory();
  const heading = t('stockcheckin.heading');
  const subHeading = t('createLoadingOrder.subtitle');
  const firstRender = useRef(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [transactionArr, setTransactionArr] = useState<
    TransactionHistory[] | DeliveryTransactionHistory[]
  >([]);
  const [stockArr, setStockArr] = useState<Stock[]>([]);
  const [attachmentArr, setAttachmentArr] = useState<Attachment[]>([]);
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
    isSignatureDone,
    setIsSignatureDone,
    setSignatureURL,
    signatureURL,
    setAlertOpen,
    alertOpen,
  } = useStockCheckInState();

  //This will only be executed when currentStep is 1
  function handleDriverSelection(driverId: string): void {
    setSelectedDriver(driverId);
    sessionStorage.setItem('selected_driver', driverId);
    sessionStorage.setItem('selected_driver_type', driverType);
    fetchDriverHistory().then(() => {
      increaseSteps();
    });
  }
  function buttonDisabled() {
    if (sessionStorage.getItem('selected_driver') && !dataLoading) {
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
    sessionStorage.removeItem('selected_driver');
    sessionStorage.removeItem('selected_driver_type');
    sessionStorage.removeItem('currentStep');
  }

  function handleAlertClose() {
    clearLocalStorage();
    setAlertOpen(false);
    navigate('/home');
  }

  const contextObj = {
    isDriverGridLoading,
    driverArray,
    selectedDriverId: selectedDriver,
    driverType,
    handleTypeChange,
    handleDriverSelection,
    transactionArr,
    stockArr,
    isSignatureDone,
    setIsSignatureDone,
    attachmentArr,
    setSignatureURL,
    signatureURL,
    dataLoading,
  };

  async function fetchDrivers() {
    let response: AxiosResponse<PendingCheckInResponse>;
    try {
      response = await api.get('/warehouse/drivers/pending-checkin');
      console.log(response);

      const vanSellerDrivers: Driver[] = response.data.data[
        driverRoles.VAN_SELLER
      ]
        ? response.data.data[driverRoles.VAN_SELLER].map(driver => ({
            driverName: driver.username,
            driverId: driver.user_id,
            driverType: driverRoles.VAN_SELLER,
          }))
        : []; // If 'VAN-SELLER' is missing, set to an empty array

      // Check if 'DELIVERY' exists
      const deliveryDrivers: Driver[] = response.data.data[driverRoles.DELIVERY]
        ? response.data.data[driverRoles.DELIVERY].map(driver => ({
            driverName: driver.username,
            driverId: driver.user_id,
            driverType: driverRoles.DELIVERY,
          }))
        : []; // If 'DELIVERY' is missing, set to an empty array

      // Check if 'HYBRID' exists
      const hybridDrivers: Driver[] = response.data.data[driverRoles.HYBRID]
        ? response.data.data[driverRoles.HYBRID].map(driver => ({
            driverName: driver.username,
            driverId: driver.user_id,
            driverType: driverRoles.HYBRID,
          }))
        : []; // If 'HYBRID' is missing, set to an empty array

      // Set the driver data in the state, categorized by type
      setDriverArray({
        'VAN-SELLER': vanSellerDrivers,
        DELIVERY: deliveryDrivers,
        HYBRID: hybridDrivers,
      });
      setIsDriverGridLoading(false);
    } catch (error) {
      console.error(error);
      setIsDriverGridLoading(false);
    }
  }
  async function fetchDriverHistory() {
    setDataLoading(true);
    let response: AxiosResponse<DriverHistoryResponse>;
    const selectedDriver = sessionStorage.getItem('selected_driver');
    const selectedDriverType = sessionStorage.getItem('selected_driver_type');
    try {
      response = await api.get(
        `/warehouse/driver/history?user_id=${selectedDriver}&business_role_id=${selectedDriverType}`,
      );
      const {orders, stocks, attachments} = response.data.data;

      const parsedTransactions = getParsedOrders(
        orders,
        selectedDriverType ?? driverRoles.VAN_SELLER,
      );

      const parsedStocks = stocks.map(stock => ({
        stockId: stock.id,
        initial: Number(stock.initial_stock),
        item: stock.product_id,
        remaining: Number(stock.remaining_stock),
      }));

      const parsedAttachments = attachments.map(attachment => ({
        attachmentId: attachment.id,
        description: attachment.description,
        attachment: attachment.attachment,
      }));

      setTransactionArr(parsedTransactions);
      setStockArr(parsedStocks);
      setAttachmentArr(parsedAttachments);
      setDataLoading(false);
    } catch (error) {
      console.error(error);
      setDataLoading(false);
    }
  }

  async function unAssignStock() {
    console.log(signatureURL);
    try {
      const response: AxiosResponse = await api.post(
        '/warehouse/unassign-stock',
        {
          user_id: sessionStorage.getItem('selected_driver'),
          manager_signature_image: signatureURL,
        },
      );
      console.log(response);
      sendNotification('Stock check in successful');
      setAlertOpen(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (location.pathname == '/stock-check-in') {
      navigate('driver');
      setCurrentStep(1);
    }
    buttonDisabled();
    return () => {
      setNextDisabled(true);
    };
  });

  useEffect(() => {
    const unlisten = history.listen(listener => {
      if (listener.action == 'POP') {
        navigate('/stock-check-in');
      }
    });
    fetchDrivers();
    handleTypeChange(driverType);
    return () => {
      clearLocalStorage();
      unlisten();
    };
  }, []);

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
      <InfoAlertDialog
        titleText={'alert.title3'}
        messageText={'alert.text1'}
        closeBtnText={'alert.btn1'}
        isOpen={alertOpen}
        handleDismiss={handleAlertClose}>
        <Lottie
          options={{
            loop: true,
            animationData: confirmAnimation,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          height={50}
          width={50}
        />
      </InfoAlertDialog>
      <Stack className={'stock-check-in'}>
        <Stack
          spacing={2}
          sx={{
            p: 1.5,
            minHeight: '80vh',
            position: 'relative',
          }}>
          <Timeline />
          <Box height={'min-content'}>
            <Outlet
              context={
                {
                  ...contextObj,
                } satisfies StockCheckInContext
              }
            />
            <br />
            <br />
          </Box>
          {currentStep > 1 && (
            <div className="buttons-group">
              <BlueBorderButton
                size={'small'}
                variant={'contained'}
                onClick={decreaseSteps}
                disabled={currentStep === 1}
                disableElevation>
                {t('createLoadingOrder.back')}
              </BlueBorderButton>

              {currentStep === steps.length ? (
                <BlueButton
                  size={'small'}
                  variant={'contained'}
                  disabled={!isSignatureDone}
                  onClick={unAssignStock}
                  disableElevation>
                  {t('createLoadingOrder.finish')}
                </BlueButton>
              ) : (
                <BlueButton
                  size={'small'}
                  variant={'contained'}
                  disabled={nextDisabled}
                  onClick={() => {
                    increaseSteps();
                  }}
                  disableElevation>
                  {t('createLoadingOrder.next')}
                </BlueButton>
              )}
            </div>
          )}
        </Stack>
      </Stack>
    </ScreenLayout>
  );
}

export default StockCheckIn;

