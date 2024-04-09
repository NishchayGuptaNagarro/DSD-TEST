# Driver Name Grid Component:
This component displays a grid of driver cards.
Based on passed driver's data.

## Required Props:
1. driverArray: Array of Driver[] objects which will we used to render each driver card.
2. selectedDriverId: State containing id of selected driver , required to control radio buttons.
3. handleDriverSelection: function that will be called when a driver is selected.

### Required Props for internal header component:
1. Driver Type: selected driver type based on which drivers will be displayed.
2. handleDriverTypeChange: callback function when driver type is changed
3. searchDriver: callback function when a search input is entered. 