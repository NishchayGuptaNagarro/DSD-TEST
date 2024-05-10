import {StockCheckOutContext} from '../propTypes/types.ts';

import {useOutletContext} from 'react-router-dom';
import DriverSelectionGrid from 'component/DriverSelectionGrid/DriverSelectionGrid.tsx';

function DriverNameGrid() {
  // Getting required props from outlet context
  const {
    isDriverGridLoading,
    driverArray,
    selectedDriverId,
    handleDriverSelection,
    driverType,
    handleTypeChange,
  } = useOutletContext<StockCheckOutContext>();

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

export default DriverNameGrid;
