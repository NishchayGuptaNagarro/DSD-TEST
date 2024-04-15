import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {AlertDialogProps} from './propTypes/types.ts';
function AlertDialog({text, open, handleOkay}: AlertDialogProps) {
  const handleClose = () => {
    handleOkay(false);
  };

  return (
    <>
      <Dialog open={open}>
        <DialogContent dividers={true} sx={{minWidth: 250}}>
          <DialogContentText
            sx={{fontWeight: 500, textAlign: 'center', color: 'black'}}>
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{p: 0}}>
          <Button onClick={handleClose} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AlertDialog;
