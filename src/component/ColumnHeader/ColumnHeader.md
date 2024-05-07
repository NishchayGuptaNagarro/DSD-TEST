# Overview

This component is used inside renderHeader method of column definition, which is passed to table. As we directly can't use "t" (translation object) in column definition we use it inside column header and pass it to render function of column definition.
This is required to enable language change of our table headers.

### Inclusion
```
import ColumnHeader from '../../../../component/ColumnHeader/ColumnHeader.tsx';
 
   renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
```

### Use Case Description
1. Used as header component of table.

### Component Designs

#### Input Props:
1. headerName:string --> Header Name to be displayed.
