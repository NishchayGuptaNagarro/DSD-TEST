// Props for alert dialog box
export interface AlertDialogProps {
  text: string;
  open: boolean;
  handleOkay: (open: boolean) => void;
}
