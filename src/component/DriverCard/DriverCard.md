# Driver Card Component:
This component is a card that displays driver name along with a radio button to select that driver
NOTE:This is not a stand-alone component this needs to be wrapped inside RadioGroup component of MUI to work
TO make it stand-alone we can replace its 'FormControlLabel' component with simple HTML radio buttons. 

## Props Required:
1. driver: An object containing properties driverName and driverId, this is required for displaying in card and also to provide a value to radio button.
2. selectedDriverId: Id of the selected driver, this is required to display selected driver css conditionally.