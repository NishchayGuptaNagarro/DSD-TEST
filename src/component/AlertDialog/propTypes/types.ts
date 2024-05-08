// Props for alert dialog box
export interface AlertDialogProps {
  messageText: string;
  closeBtnText: string;
  isOpen: boolean;
  handleDismiss: (open: boolean) => void;
}
