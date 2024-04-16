import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import {useState} from 'react';
import {ClipLoader} from 'react-spinners';

import DropDownButton from '../DropDownButton/DropDownButton.tsx';
import './DriverSignature.scss';
import {AxiosResponse} from 'axios';
import {SignatureApiResponse} from './propTypes/types.ts';
import {api} from '../../axios/api.ts';
import {useTranslation} from 'react-i18next';
import {useOutletContext} from 'react-router-dom';
import {DriverOutletContext} from '../../screens/SelectDriver/propTypes/types.ts';

function DriverSignature() {
  const {isSignatureLoaded, setIsSignatureLoaded} =
    useOutletContext<DriverOutletContext>();
  const [showLoading, setShowLoading] = useState(false);
  const actions = ['Activate', 'Reject']; //More actions can be added to this array in future
  const [signatureURL, setSignatureURL] = useState('');
  const {t} = useTranslation();
  // This function will be called when our action is clicked
  function handleAction(selectedIndex: number) {
    console.log(selectedIndex + ' i was clicked');
  }
  async function fetchSignature() {
    setShowLoading(true);
    let response: AxiosResponse<SignatureApiResponse>;
    let status = 0;
    try {
      while (status !== 200) {
        response = await api.get(
          `/warehouse/digital-signature?user_id=${localStorage.getItem('selected_driver')}`,
        );
        console.log(response);
        status = response.data.status_code;
        switch (status) {
          case 200: {
            setShowLoading(false);
            setSignatureURL(
              'data:image/png;base64,' + response.data.data.signature_image,
            );
            setIsSignatureLoaded(true);
            break;
          }
          case 404: {
            //waiting before making new calls
            await new Promise(resolve => setTimeout(resolve, 2000));
            break;
          }
          default: {
            setShowLoading(false);
            throw new Error('an error occured while fetching signature');
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form className={'driver-signature-form'}>
        <label className={'form-label label-1'}>
          {t('createLoadingOrder.signature.label')}:
        </label>
        <span className={'signature-container'}>
          {/*This center class is defined in app.scss we can use it to center anything*/}

          {!(isSignatureLoaded || showLoading) && (
            <Button
              variant="contained"
              className={'center'}
              onClick={fetchSignature}>
              {t('createLoadingOrder.button.label')}
            </Button>
          )}
          {showLoading && (
            <div className={'center'}>
              <ClipLoader color="#344767" />
            </div>
          )}
          {isSignatureLoaded && <img src={signatureURL} alt={'img'} />}
        </span>

        <label className={'form-label label-2'}>
          {t('createLoadingOrder.note.label')}:
        </label>
        <textarea
          placeholder={t('createLoadingOrder.note.placeholder')}
          className={'text-box font-sm'}></textarea>
        <Box
          className={'form-action'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          gap={4}>
          <label className={'form-label'}>
            {t('createLoadingOrder.action.label')}:
          </label>
          {/*This button will display list of all actions*/}
          <DropDownButton options={actions} handleClick={handleAction} />
        </Box>
      </form>
    </>
  );
}

export default DriverSignature;
