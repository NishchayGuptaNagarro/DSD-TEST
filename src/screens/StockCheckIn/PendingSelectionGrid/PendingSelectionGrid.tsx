import DriverSelectionGrid from 'component/DriverSelectionGrid/DriverSelectionGrid.tsx';
import {useOutletContext} from 'react-router-dom';
import {StockCheckInContext} from '../propTypes/types.ts';

function PendingSelectionGrid() {
  const {
    isDriverGridLoading,
    handleDriverSelection,
    driverType,
    handleTypeChange,
    driverArray,
    dataLoading,
    selectedDriverId,
  } = useOutletContext<StockCheckInContext>();

  return (
    <DriverSelectionGrid
      isDriverGridLoading={isDriverGridLoading}
      driverArray={driverArray}
      dataLoading={dataLoading}
      selectedDriverId={selectedDriverId}
      handleDriverSelection={handleDriverSelection}
      driverType={driverType}
      handleTypeChange={handleTypeChange}
    />
  );
}

export default PendingSelectionGrid;

