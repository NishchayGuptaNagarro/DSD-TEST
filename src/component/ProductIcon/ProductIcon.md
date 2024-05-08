## Overview
This component display product image, name and id , in a single container.

### Inclusion

```
import ProductIcon from '/component/ProductIcon/ProductIcon.tsx';
 
 <ProductIcon
            productId={productId}
            productName={value}
            productImage={imageSrc}
          />
```

### Use Case Description
1. Can be used to display an icon for a prooduct containing its name, image and ID.

### Component Designs

#### Input Props

1. productName: string-> Name of the product
2. productId: string -> Product unique Id
3. productImage: string -> Source of the product image
