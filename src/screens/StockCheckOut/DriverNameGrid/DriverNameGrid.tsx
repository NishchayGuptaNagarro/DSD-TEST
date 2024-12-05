import {StockCheckOutContext} from '../propTypes/types.ts';

import DriverSelectionGrid from 'component/DriverSelectionGrid/DriverSelectionGrid.tsx';
import {useOutletContext} from 'react-router-dom';

function DriverNameGrid() {
  // Getting required props from outlet context
  const {
    isDriverGridLoading,
    driverArray,
    handleDriverSelection,
    driverType,
    handleTypeChange,
    selectedDriverId,
  } = useOutletContext<StockCheckOutContext>();

  return (
    <DriverSelectionGrid
      isDriverGridLoading={isDriverGridLoading}
      driverArray={driverArray}
      handleDriverSelection={handleDriverSelection}
      driverType={driverType}
      selectedDriverId={selectedDriverId}
      handleTypeChange={handleTypeChange}
    />
  );
}

export default DriverNameGrid;

