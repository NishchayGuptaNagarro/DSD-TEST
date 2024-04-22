// Props for alert dialog box
export interface AlertDialogProps {
  messageText: string;
  closeBtnText: string;
  open: boolean;
  handleDismiss: (open: boolean) => void;
}
