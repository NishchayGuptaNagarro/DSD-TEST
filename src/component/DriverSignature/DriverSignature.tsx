import './DriverSignature.scss';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CachedIcon from '@mui/icons-material/Cached';
import {useState} from 'react';
import {imageUrl} from './Image';
function DriverSignature() {
  const [isSignatureLoaded, setIsSignatureLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
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
            <CachedIcon fontSize={'large'} className={'center'} />
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
          {isSignatureLoaded ? (
            <Button
              variant="contained"
              disableElevation
              sx={{
                bgcolor: 'success.light',
                '&:hover': {
                  bgcolor: 'success.main',
                },
              }}>
              Activate
            </Button>
          ) : (
            <Button disableElevation variant={'contained'} color={'error'}>
              Reject
            </Button>
          )}
        </Box>
      </form>
    </>
  );
}

export default DriverSignature;
