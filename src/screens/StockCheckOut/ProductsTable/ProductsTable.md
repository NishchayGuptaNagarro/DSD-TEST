# Overview
Products table display in a model when we click on show products in delivery table.

### Inclusion

```
import ProductsTable from '../ProductsTable/ProductsTable.tsx';
 
   <ProductsTable products={productArray} />
```

### Use Case Description
1. Used to display products in an order in delivery journey.

### Component Designs
#### Input Props
1. products:Product[] --> Array of products displayed as table rows.
