import RadioGroup from '@mui/material/RadioGroup';
import {DriverNameGridProps} from './propTypes/types.ts';
import DriverCard from '../DriverCard/DriverCard.tsx';
function DriverNameGrid({
  driverArray,
  selectedDriverId,
  handleDriverSelection,
}: DriverNameGridProps) {
  return (
    //   Radio Group will control which radio button is selected based on value attribute, its onChange event is triggered when we click on a radio button
    <RadioGroup
      name="controlled-radio-buttons-group"
      value={selectedDriverId}
      onChange={handleDriverSelection}
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: 'repeat(4,1fr)',
      }}>
      {/*  Iterating through driver data and rendering it as driver card*/}
      {driverArray.map(driver => {
        return (
          <DriverCard
            key={driver.driverId}
            driver={driver}
            selectedDriverId={selectedDriverId}
          />
        );
      })}
    </RadioGroup>
  );
}

export default DriverNameGrid;
