import Stack from '@mui/material/Stack';

import {ChangeEvent, useContext, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Outlet} from 'react-router';
import {useLocation, useNavigate} from 'react-router-dom';
import {ClipLoader} from 'react-spinners';

import {AxiosResponse} from 'axios';
import AlertDialog from 'component/AlertDialog/AlertDialog.tsx';
import ScreenLayout from 'component/ScreenLayout/ScreenLayout.tsx';
import Timeline from 'component/Timeline/Timeline.tsx';

import {api} from 'api/api.ts';
import BlueBorderButton from 'component/BlueBorderButton/BlueBorderButton.tsx';
import BlueButton from 'component/BlueButton/BlueButton.tsx';
import Header from 'component/Header/Header.tsx';
import PageDetails from 'component/PageDetails/PageDetails.tsx';
import timelineContext from 'context/timeline/timelineContext.ts';
import {createBrowserHistory} from 'history';
import {Attachment} from 'models/Attachment.ts';
import {Driver} from 'models/Driver.ts';
import {DriverHistoryResponse} from 'models/DriverHistoryResponse.ts';
import {driverTypes} from 'models/driverTypes.ts';
import {Stock} from 'models/Stock.ts';
import {TransactionHistory} from 'models/TransactionHistory.ts';
import {checkApiError} from 'utilities/checkApiError.ts';
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
  const subHeading = t('stockcheckin.subheading');
  const firstRender = useRef(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [transactionArr, setTransactionArr] = useState<TransactionHistory[]>(
    [],
  );
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

  function handleDriverSelection(event: ChangeEvent<HTMLInputElement>) {
    setSelectedDriver(event.target.value);
    sessionStorage.setItem('selected_driver', event.target.value);
    sessionStorage.setItem('selected_driver_type', driverType);
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
  };

  async function fetchDrivers() {
    let response: AxiosResponse<PendingCheckInResponse>;
    let driverData: Driver[];
    try {
      response = await api.get('/warehouse/drivers/pending-checkin');
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
  async function fetchDriverHistory() {
    setDataLoading(true);
    let response: AxiosResponse<DriverHistoryResponse>;
    try {
      response = await api.get(
        `/warehouse/driver/history?user_id=${sessionStorage.getItem('selected_driver')}`,
      );
      checkApiError(response);

      const {orders, stocks, attachments} = response.data.data;

      const parsedTransactions = orders.map((transaction, i) => ({
        rowId: i,
        customerId: Number(transaction.customer.external_id),
        customerName: transaction.customer.customer_name,
        grossAmount: transaction.gross_amount,
        currIso: transaction.curr_iso,
        orderId: transaction.order_number || '0',
        paymentMethods: {
          cash: transaction.payment_method.cash,
          credit: transaction.payment_method.credit,
          cheque: transaction.payment_method.cheque,
        },
      }));

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
      console.log(error);
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
      checkApiError(response);
      sendNotification('Stock check in successful');
      setAlertOpen(true);
    } catch (error) {
      console.log(error);
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
      <AlertDialog
        messageText={'alert.text1'}
        isOpen={alertOpen}
        closeBtnText={'alert.btn1'}
        handleDismiss={handleAlertClose}
      />
      <Stack className={'stock-check-in'}>
        <Stack
          spacing={2}
          sx={{
            p: 1.5,
            minHeight: '80vh',
            position: 'relative',
          }}>
          <Timeline />
          <Outlet
            context={
              {
                ...contextObj,
              } satisfies StockCheckInContext
            }
          />
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
                disabled={!isSignatureDone}
                onClick={unAssignStock}>
                {t('createLoadingOrder.finish')}
              </BlueButton>
            ) : (
              <BlueButton
                size={'small'}
                variant={'contained'}
                disabled={nextDisabled}
                onClick={() => {
                  if (currentStep == 1) {
                    fetchDriverHistory().then(() => {
                      increaseSteps();
                    });
                  } else {
                    increaseSteps();
                  }
                }}>
                {dataLoading ? (
                  <ClipLoader size={20} />
                ) : (
                  t('createLoadingOrder.next')
                )}
              </BlueButton>
            )}
          </div>
        </Stack>
      </Stack>
    </ScreenLayout>
  );
}

export default StockCheckIn;

