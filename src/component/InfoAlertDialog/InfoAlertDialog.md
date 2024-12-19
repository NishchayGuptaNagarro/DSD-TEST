# Overview

InfoAlertDialog component displays an alert and can only be dismissed when we click on provided cancel button. It is reusable and can be placed over any screen.

### Inclusion

```
import InfoAlertDialog from '/component/InfoAlertDialog/InfoAlertDialog.tsx';

<InfoAlertDialog
        titleText={titleText}
        messageText={alertText}
        open={alertOpen}
        closeBtnText={'Okay'}
        handleDismiss={handleAlertClose}>{children node as icon}</InfoAlertDialog>
```

### Use Case Description

1. To display an alert message.
2. We can write any logic inside and pass it as handleDismiss, we can also show any icon in alert.

### Component Designs

#### Input Props

1. messageText:string -> Text to be displayed.
2. open:boolean -> state representing dialog is open or close,
3. handleDismiss:(open: boolean) => void -> function to be called when we click on okay here we can close the dialog and write other logic.
4. closeBtnText:string -> string written on dialog dismiss button.
5. titleText:string -> Title text to be displayed.
6. children -> Icon to be displayed.
