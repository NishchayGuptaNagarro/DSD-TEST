import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {AlertDialogProps} from './propTypes/types.ts';
import styles from '../../styles/design-systems.module.scss';

function AlertDialog({
  messageText,
  open,
  handleDismiss,
  closeBtnText,
}: AlertDialogProps) {
  const handleClose = () => {
    handleDismiss(false);
  };

  return (
    <>
      <Dialog open={open}>
        <DialogContent dividers={true} sx={{minWidth: 250}}>
          <DialogContentText
            sx={{
              fontWeight: styles.fontWeightNormal,
              textAlign: 'center',
              color: styles.black,
            }}>
            {messageText}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{p: 0}}>
          <Button onClick={handleClose} autoFocus>
            {closeBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AlertDialog;
