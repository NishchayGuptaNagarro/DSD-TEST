import {ReactNode} from 'react';

export interface InfoAlertDialogProps {
  children: ReactNode;
  titleText: string;
  messageText: string;
  closeBtnText: string;
  isOpen: boolean;
  handleDismiss: (open: boolean) => void;
}
