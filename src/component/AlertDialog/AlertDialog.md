# Overview

Alert component displays an alert and can only be dismissed when we click on 'okay'.
place this component in the parent of the screen.

### Inclusion

```
import AlertDialog from '/component/AlertDialog/AlertDialog.tsx';
 
<AlertDialog
        messageText={alertText}
        open={alertOpen}
        closeBtnText={'Okay'}
        handleDismiss={handleAlertClose}
      />
```

### Use Case Description
1. Alert component to display an alert message.
2. We can write any logic inside handleDismiss.

### Component Designs

#### Input Props

1. messageText:string -> Text to be display.
2. open:boolean -> state representing dialog is open or close,
3. handleDismiss:(open: boolean) => void -> function to be called when we click on okay here we can close the dialog and write other logic.
4. closeBtnText:string -> string written on dialog dismiss button.

