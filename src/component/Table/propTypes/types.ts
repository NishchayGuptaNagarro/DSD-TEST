//generic table row type, any type of rows passed to table should extend this interface
export interface Row {
	[key: string]: string | number; //using index signature syntax
}
