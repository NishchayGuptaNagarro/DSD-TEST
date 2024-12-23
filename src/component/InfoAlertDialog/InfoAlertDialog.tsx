import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';
import './InfoAlertDialog.scss';
import {InfoAlertDialogProps} from './propTypes/types.ts';

function InfoAlertDialog({
  children: icon,
  titleText,
  messageText,
  isOpen,
  handleDismiss,
  closeBtnText,
}: InfoAlertDialogProps) {
  const handleClose = () => {
    handleDismiss(false);
  };

  const {t} = useTranslation();

  return (
    <>
      <Dialog
        open={isOpen}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            marginLeft: 'auto',
            marginRight: {sm: '26%', xl: '30%'},
          },
        }}>
        <DialogContent
          sx={{
            minWidth: 380,
            maxHeight: 246,
          }}>
          <div className="icon-container">{icon}</div>

          <DialogContentText
            sx={{
              fontSize: styles.fontSizeLg,
              fontWeight: styles.fontWeightBolder,
              textAlign: 'center',
              color: styles.black,
            }}>
            {t(titleText)}
          </DialogContentText>
          <DialogContentText
            sx={{
              fontSize: styles.fontSizeSm,
              fontWeight: styles.fontWeightLight,
              textAlign: 'center',
              color: styles.grayMuted,
            }}>
            {t(messageText)}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button
            className={'font-md font-bolder'}
            type={'submit'}
            variant="contained"
            sx={{
              minWidth: '90%',
              '&:hover': {
                backgroundColor: styles.deepNavy,
              },
              mb: 2,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              backgroundColor: styles.deepNavy,
            }}
            onClick={handleClose}
            disableElevation>
            {t(closeBtnText)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default InfoAlertDialog;
