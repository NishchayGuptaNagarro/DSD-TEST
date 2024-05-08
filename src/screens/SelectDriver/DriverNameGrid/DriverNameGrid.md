# Overview

This component displays a grid of driver cards. Based on given drivers data array in driver outlet context
This is not a pure component and is made for Select driver screen

### Inclusion

```
import /component/DriverNameGrid/DriverNameGrid.tsx;
 
  <DriverName />
```

### Use Case Description
1. Used to display list of drivers when creating loading order, user uses it to select required driver.

### Component Designs

#### Input Props

1. driverArray:Driver[] -> Array of Driver[] objects which will we used to render each driver card.
2. selectedDriverId: string -> State containing id of selected driver , required to control radio buttons.
3. handleDriverSelection:((event: ChangeEvent<HTMLInputElement>) => void)| (() => void) -> function that will be called when a driver is selected.
