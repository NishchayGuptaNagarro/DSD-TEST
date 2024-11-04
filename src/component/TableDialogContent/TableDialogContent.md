## Overview

TableDialogContent component that display dialog content along with table and close button.

### Inclusion

```
import Table from '../TableDialogContent/TableDialogContent.tsx';

 <TableDialogContent
          rows={transactionArr}
          columns={transactionColDef}
          getRowId={getTransactionRowId}
          setShowDialog={() => {
            setShowTransaction(false);
          }}
          selectedDriverId={selectedDriverId}
          dialogHeader="history.orderSummary"
          noOfRows={3}
        />
```

### Use Case Description

1. Can be used to display a dialog content along with the table as per the row or column based on column definition passed.
2. Also includes cross(cancel) button to close dialog.

### Component Designs

#### Input Props

1. rows:Row[] -> Array of type 'Row', this should contain objects, whose keys will be mapped to column's field. Each row element must have a unique id.
2. columns:GridColDef[] -> Array containing Definition of each column, should define the field according to which values will be displayed in each cell, and other optional properties.
3. getRowId:(row:Row)=>number -> This function takes in a row object and should return its unique ID.
4. setShowDialog: (value: boolean) => void -> This function makes the parent dialog close.
5. selectedDriverId: string -> This holds the selected driver's id to show on dialog content.
6. dialogHeader: string -> This holds the header of the dialog content.
7. noOfRows:number -> Number of rows shown in single page.
