import {useOutletContext} from 'react-router-dom';
import DriverSelectionGrid from 'component/DriverSelectionGrid/DriverSelectionGrid.tsx';
import {StockCheckInContext} from '../propTypes/types.ts';

function PendingSelectionGrid() {
  const {
    isDriverGridLoading,
    selectedDriverId,
    handleDriverSelection,
    driverType,
    handleTypeChange,
    driverArray,
  } = useOutletContext<StockCheckInContext>();

  return (
    <DriverSelectionGrid
      isDriverGridLoading={isDriverGridLoading}
      driverArray={driverArray}
      selectedDriverId={selectedDriverId}
      handleDriverSelection={handleDriverSelection}
      driverType={driverType}
      handleTypeChange={handleTypeChange}
    />
  );
}

export default PendingSelectionGrid;
