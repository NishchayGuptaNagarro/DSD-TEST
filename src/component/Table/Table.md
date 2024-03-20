# Table Component:

Table component that display passed rows according to passed column definitions.

## Required Props:

1. rows:Row[] -> Array of type 'Row', this should contain objects, whose keys will be mapped to column's field. Each row element must have a unique id.
2. columns:GridColDef[] -> Array containing Definition of each column, should define the field according to which values will be displayed in each cell, and other optional properties.
3. getRowId:(row:Row)=>number -> This function takes in a row object and should return its unique ID.
