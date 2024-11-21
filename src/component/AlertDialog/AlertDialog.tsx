import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';
import {AlertDialogProps} from './propTypes/types.ts';

function AlertDialog({
  messageText,
  isOpen,
  handleDismiss,
  closeBtnText,
}: AlertDialogProps) {
  const handleClose = () => {
    handleDismiss(false);
  };

  const {t} = useTranslation();
  const theme = useTheme();
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));

  return (
    <>
      <Dialog
        open={isOpen}
        PaperProps={{
          style: {
            marginLeft: 'auto',
            marginRight: isExtraLargeScreen ? '30%' : '26%',
          },
        }}>
        <DialogContent dividers={true} sx={{minWidth: 250}}>
          <DialogContentText
            sx={{
              fontWeight: styles.fontWeightNormal,
              textAlign: 'center',
              color: styles.black,
            }}>
            {t(messageText)}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{p: 0}}>
          <Button data-testid={'dismiss-btn'} onClick={handleClose} autoFocus>
            {t(closeBtnText)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AlertDialog;

