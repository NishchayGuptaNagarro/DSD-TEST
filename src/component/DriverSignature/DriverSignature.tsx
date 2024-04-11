import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import {useState} from 'react';
import {ClipLoader} from 'react-spinners';

import DropDownButton from '../DropDownButton/DropDownButton.tsx';
import './DriverSignature.scss';
import {imageUrl} from './Image';
function DriverSignature() {
  const [isSignatureLoaded, setIsSignatureLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const actions = ['Activate', 'Reject']; //More actions can be added to this array in future

  // This function will be called when our action is clicked
  function handleAction(selectedIndex: number) {
    console.log(selectedIndex + ' i was clicked');
  }
  function fetchSignature() {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      setIsSignatureLoaded(true);
    }, 1000);
  }

  return (
    <>
      <form className={'driver-signature-form'}>
        <label className={'form-label label-1'}>Driver Signature:</label>
        <span className={'signature-container'}>
          {/*This center class is defined in app.scss we can use it to center anything*/}

          {!(isSignatureLoaded || showLoading) && (
            <Button
              variant="contained"
              className={'center'}
              onClick={fetchSignature}>
              GET THE SIGNATURE
            </Button>
          )}
          {showLoading && (
            <div className={'center'}>
              <ClipLoader color="#344767" />
            </div>
          )}
          {isSignatureLoaded && <img src={imageUrl} alt={'img'} />}
        </span>

        <label className={'form-label label-2'}>Add notes:</label>
        <textarea
          placeholder={'Please enter the notes..'}
          className={'text-box font-sm'}></textarea>
        <Box
          className={'form-action'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          gap={4}>
          <label className={'form-label'}>Action:</label>
          {/*This button will display list of all actions*/}
          <DropDownButton options={actions} handleClick={handleAction} />
        </Box>
      </form>
    </>
  );
}

export default DriverSignature;
