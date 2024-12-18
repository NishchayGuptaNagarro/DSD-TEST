import Button from '@mui/material/Button';

import {AxiosResponse, isAxiosError} from 'axios';
import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useOutletContext} from 'react-router-dom';
import {ClipLoader} from 'react-spinners';
// import DropDownButton from 'component/DropDownButton/DropDownButton.tsx';
import Paper from '@mui/material/Paper';
import {api} from 'api/api.ts';
import styles from 'styles/design-systems.module.scss';
import {sendNotification} from 'utilities/sendNotification.ts';
import {StockCheckOutContext} from '../propTypes/types.ts';
import './DriverSignature.scss';
import {SignatureApiResponse} from './propTypes/types.ts';

function DriverSignature() {
  const {isSignatureLoaded, setIsSignatureLoaded} =
    useOutletContext<StockCheckOutContext>();
  const [showLoading, setShowLoading] = useState(false);
  // const actions = ['driversignature.action1', 'driversignature.action2']; //More actions can be added to this array in future
  const [signatureURL, setSignatureURL] = useState('');
  const {t} = useTranslation();
  // This function will be called when our action is clicked
  // function handleAction(selectedIndex: number) {
  //   console.log(selectedIndex + ' i was clicked');
  // }

  const isFocused = useRef(true); //using this to dismiss api call when component is umounted else call continues

  async function fetchSignature() {
    let executeLoop = true;
    setShowLoading(true);

    let response: AxiosResponse<SignatureApiResponse>;

    while (executeLoop) {
      try {
        response = await api.get(
          `/warehouse/digital-signature?user_id=${sessionStorage.getItem('selected_driver')}`,
        );
        console.log(response);
        setShowLoading(false);
        setSignatureURL(response.data.data.driver_signature_image);
        setIsSignatureLoaded(true);
        executeLoop = false;
      } catch (error) {
        const statusCode = isAxiosError(error) ? error.response?.status : null;
        if (statusCode === 404) {
          //waiting before making new calls
          await new Promise(resolve => setTimeout(resolve, 4000));
          if (!isFocused.current) {
            return;
          }
        } else {
          executeLoop = false;
          console.error(error);
          setShowLoading(false);
        }
      }
    }
  }
  useEffect(() => {
    if (signatureURL == '') {
      setIsSignatureLoaded(false);
    }
    isFocused.current = true;
    return () => {
      isFocused.current = false;
    };
  });
  return (
    <>
      <div className="signature-label">
        {t('createLoadingOrder.signature.label')}
      </div>
      <Paper elevation={0} className="wrapper">
        <span className={'signature-container'}>
          {/*This center class is defined in app.scss we can use it to center anything*/}

          {!(isSignatureLoaded || showLoading) && (
            <Button
              variant="contained"
              data-testid={'get-signature-btn'}
              className={'signature-btn'}
              onClick={() => {
                sendNotification('Please sign to confirm checkout');
                fetchSignature();
              }}
              disableElevation>
              {t('createLoadingOrder.button.label')}
            </Button>
          )}
          {showLoading && (
            <div className={'loading-spinner'}>
              <ClipLoader color={styles.blueSteel} />
            </div>
          )}
          {isSignatureLoaded && (
            <Paper elevation={2} className="img-container">
              <img src={signatureURL} alt={'img'} />
            </Paper>
          )}
        </span>
      </Paper>
    </>
  );
}

export default DriverSignature;

