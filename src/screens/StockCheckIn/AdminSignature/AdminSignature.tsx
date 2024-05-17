import IconButton from '@mui/material/IconButton';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import {useOutletContext} from 'react-router-dom';
import {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
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
      <form className={'admin-signature-form'}>
        <label className={'form-label label-1'}>
          {t('createLoadingOrder.signature.admin')}:
        </label>
        <span className={'signature-container'}>
          <SignatureCanvas
            canvasProps={{
              className: 'signature-canvas',
            }}
            dotSize={5}
            ref={signatureCanvas}
            onEnd={handleSignatureDone}
            throttle={0}></SignatureCanvas>
          <IconButton className={'clear-btn'} onClick={clearSignature}>
            <DeleteSharpIcon />
          </IconButton>
        </span>

        <label className={'form-label label-2'}>
          {t('createLoadingOrder.note.label')}:
        </label>
        <textarea
          placeholder={t('createLoadingOrder.note.placeholder')}
          className={'text-box font-sm'}></textarea>
      </form>
    </>
  );
}

export default AdminSignature;
