import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import RedCross from 'assets/SVG/RedCross.svg';
import {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useOutletContext} from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import {StockCheckInContext} from '../propTypes/types.ts';
import './AdminSignature.scss';

function AdminSignature() {
  const {t} = useTranslation();
  const {setIsSignatureDone, setSignatureURL} =
    useOutletContext<StockCheckInContext>();

  const signatureCanvas = useRef<SignatureCanvas>(null);

  function handleSignatureDone() {
    setSignatureURL(signatureCanvas.current?.toDataURL().substring(22) || '');
    setIsSignatureDone(true);
  }
  function clearSignature() {
    signatureCanvas.current?.clear();
    setIsSignatureDone(false);
  }
  useEffect(() => {
    return () => {
      setIsSignatureDone(false);
    };
  }, []);

  return (
    <>
      <div className="signature-label">
        {t('createLoadingOrder.signature.admin')}
      </div>
      <Paper elevation={0} className="wrapper">
        <div
          data-testid={'signature-container'}
          className={'signature-container'}>
          <SignatureCanvas
            canvasProps={{
              className: 'signature-canvas',
            }}
            dotSize={5}
            ref={signatureCanvas}
            onEnd={handleSignatureDone}
            throttle={0}></SignatureCanvas>
          <IconButton className={'clear-btn'} onClick={clearSignature}>
            <img src={RedCross} alt="clear-btn" />
          </IconButton>
        </div>
      </Paper>
    </>
  );
}

export default AdminSignature;

