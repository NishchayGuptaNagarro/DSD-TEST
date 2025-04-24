import Box from '@mui/material/Box';
import DriverNameGridHeader from 'component/DriverNameGridHeader/DriverNameGridHeader.tsx';
import {Driver} from 'models/Driver.ts';
import {driverTypes} from 'models/driverTypes.ts';
import {MouseEvent, useEffect, useState} from 'react';
import Loading from 'screens/Loading/Loading.tsx';
import DriverCard from './DriverCard/DriverCard.tsx';
import {DriverSelectionGridProps} from './propTypes/types.ts';

function DriverSelectionGrid({
  handleDriverSelection,
  driverType,
  isDriverGridLoading,
  driverArray,
  dataLoading = false,
  selectedDriverId,
  handleTypeChange,
}: DriverSelectionGridProps) {
  // State containing array filtered after driver type and search text
  const [filteredArray, setFilteredArray] = useState<Driver[]>([]);
  // State containing search text from user
  const [searchText, setSearchText] = useState('');

  // This function filters driver Arrays based on driver type and search text
  function filterDriverArray(searchText: string) {
    setFilteredArray(
      (driverArray[driverType] || [])
        .filter(driver => driver.driverType === driverType)
        .filter(
          driver =>
            driver.driverName
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            driver.driverId.toLowerCase().includes(searchText.toLowerCase()),
        ),
    );
  }
  function handleDriverTypeChange(
    _: MouseEvent<HTMLElement>,
    value: driverTypes,
  ) {
    if (value !== null) {
      handleTypeChange(value);
      searchDriver('');
    }
  }
  // This will set the search text, triggering the useEffect to filter the array
  // This function will be called after a delay, so its only called when user stops typing to avoid unnecessary re-renders
  function searchDriver(searchInput: string) {
    setSearchText(searchInput);
  }

  // Use effect will trigger array filter
  useEffect(() => {
    filterDriverArray(searchText);
  }, [driverType, searchText, driverArray]);

  if (isDriverGridLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <DriverNameGridHeader
          driverType={driverType}
          handleDriverTypeChange={handleDriverTypeChange}
          searchDriver={searchDriver}
        />
        {/* Radio Group will control which radio button is selected based on value attribute, its onChange event is triggered when we click on a radio button*/}
        <Box
          sx={{
            width: '100%',
            rowGap: '7%',
            columnGap: '1%',
            display: 'grid',
            gridTemplateColumns: {
              sm: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
              xl: 'repeat(4, 1fr)',
            },
          }}>
          {/*  Iterating through driver data and rendering it as driver card*/}
          {filteredArray.map(driver => {
            return (
              <DriverCard
                key={driver.driverId}
                driver={driver}
                dataLoading={dataLoading}
                selectedDriverId={selectedDriverId}
                handleDriverSelection={handleDriverSelection}
              />
            );
          })}
        </Box>
      </>
    );
  }
}

export default DriverSelectionGrid;

