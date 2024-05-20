## Overview
Table component that display passed rows according to passed column definitions.

### Inclusion

```
import Table from '../Table/Table.tsx';
 
 <Table rows={rows} columns={columns} getRowId={getRowId} showMenu={false}
  noOfRows={5} />
```

### Use Case Description
1. Can be used to display any row or column based on column definition passed.
2. Also supports filtering, searching, sorting, editing.

### Component Designs

#### Input Props

1. rows:Row[] -> Array of type 'Row', this should contain objects, whose keys will be mapped to column's field. Each row element must have a unique id.
2. columns:GridColDef[] -> Array containing Definition of each column, should define the field according to which values will be displayed in each cell, and other optional properties.
3. getRowId:(row:Row)=>number -> This function takes in a row object and should return its unique ID.
4. showMenu:boolean -> Decides whether to show column menu or not.
5. noOfRows:number -> Number of rows shown in single page.
6. minHeight?:number -> minimum height taken by table.

