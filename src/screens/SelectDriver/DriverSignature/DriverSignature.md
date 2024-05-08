# Overview
Driver Signature component displays form for processing driver signature and also contains multiple actions user can perform.
This is not a pure component and is used inside select driver screen

### Inclusion

```
import '/component/DriverSignature/DriverSignature.tsx',
 
  <DriverSignature />
```

### Use Case Description
1. Form component that performs an api get request and takes required user input for processing fetched data.

### Component Designs

#### Input Props

1. isSignatureLoaded: Tells whether signature is fetched from api
2. setIsSignatureLoaded: Function to update state when signature is loaded.
