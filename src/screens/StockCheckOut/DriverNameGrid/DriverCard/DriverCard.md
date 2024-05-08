
# Overview

This component is a card that displays driver name along with a radio button to select that driver
<br>
NOTE:This is not a stand-alone component this needs to be wrapped inside RadioGroup component of MUI to work
TO make it stand-alone we can replace its 'FormControlLabel' component with simple HTML radio buttons.

### Inclusion

```
import DriverCard from '/component/DriverCard/DriverCard.tsx';
 
   <DriverCard
              driver={driver}
              selectedDriverId={selectedDriverId}
            />
```

### Use Case Description
1. Is used inside driver name grid to display driver names and selection button.

### Component Designs

#### Input Props

1. driver:Driver -> An object containing properties driverName and driverId, this is required for displaying in card and also to provide a value to radio button.
2. selectedDriverId:string -> Id of the selected driver, this is required to display selected driver css conditionally.

