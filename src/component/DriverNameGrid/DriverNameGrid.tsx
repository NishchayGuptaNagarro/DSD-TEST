import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import {
  DriverNameGridHeaderProps,
  DriverNameGridProps,
} from './propTypes/types.ts';
import {Driver} from '../../screens/SelectDriver/propTypes/types.ts';
import DriverCard from '../DriverCard/DriverCard.tsx';
import './DriverNameGrid.scss';

import vanSellerIcon from '../../assets/VanSeller.svg';
import deliveryIcon from '../../assets/Delivery.svg';
import hybridIcon from '../../assets/Hybrid.svg';

import {useState, MouseEvent, ChangeEvent, useRef, useEffect} from 'react';
import {useOutletContext} from 'react-router-dom';
import {DriverOutletContext} from '../../screens/SelectDriver/SelectDriver.tsx';

function DriverNameGrid() {
  const {driverArray, selectedDriverId, handleDriverSelection} =
    useOutletContext<DriverOutletContext>();

  // State containing driver type
  const [driverType, setDriverType] = useState<
    'vanSeller' | 'delivery' | 'hybrid'
  >('vanSeller');

  // State containing array filtered after driver type and search text
  const [filteredArray, setFilteredArray] = useState<Driver[]>([]);

  // State containing search text from user
  const [searchText, setSearchText] = useState('');

  // This function filters driver Arrays based on driver type and search text
  function filterDriverArray(searchText: string) {
    setFilteredArray(
      driverArray
        .filter(driver => driver.driverType === driverType)
        .filter(driver => driver.driverName.includes(searchText)),
    );
  }

  // Use effect will trigger array filter
  useEffect(() => {
    filterDriverArray(searchText);
  }, [driverType, searchText]);

  function handleDriverTypeChange(
    _: MouseEvent<HTMLElement>,
    value: 'vanSeller' | 'delivery' | 'hybrid',
  ) {
    setDriverType(value);
  }

  // This will set the search text, triggering the useEffect to filter the array
  // This function will be called after a delay, so its only called when user stops typing to avoid unnecessary re-renders
  function searchDriver(searchInput: string) {
    setSearchText(searchInput);
  }

  return (
    <>
      <DriverNameGridHeader
        driverType={driverType}
        handleDriverTypeChange={handleDriverTypeChange}
        searchDriver={searchDriver}
      />
      {/* Radio Group will control which radio button is selected based on value attribute, its onChange event is triggered when we click on a radio button*/}
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
        {filteredArray.map(driver => {
          return (
            <DriverCard
              key={driver.driverId}
              driver={driver}
              selectedDriverId={selectedDriverId}
            />
          );
        })}
      </RadioGroup>
    </>
  );
}

export default DriverNameGrid;

// Grid Header Component
function DriverNameGridHeader({
  driverType,
  searchDriver,
  handleDriverTypeChange,
}: DriverNameGridHeaderProps) {
  // States for search input field
  const [searchInput, setSearchInput] = useState('');
  // This will hold timeout id
  const searchTimeout = useRef<number | null>(null);
  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    // First this function will check if there is a timeout f and will clear it if there is one then it will set a new timeout
    // This is done so that search is only triggered when user finishes typing
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    setSearchInput(event.target.value);

    // Search timeout is set to 400ms can be changed to trigger search faster
    searchTimeout.current = setTimeout(() => {
      searchDriver(event.target.value);
    }, 400);
  }
  return (
    <Box className={'driver-grid-header font-sm'}>
      <span className={'select-text'}>Select Driver Type:</span>
      <ToggleButtonGroup
        color="primary"
        value={driverType}
        exclusive
        onChange={handleDriverTypeChange}
        size={'small'}>
        <ToggleButton
          className={'font-xsm'}
          sx={{fontWeight: '600'}}
          value="vanSeller">
          <img src={vanSellerIcon} alt={'icon'} />
          Van-Seller
        </ToggleButton>

        <ToggleButton
          className={'font-xsm'}
          sx={{fontWeight: '600'}}
          value="delivery">
          <img src={deliveryIcon} alt={'icon'} />
          Delivery
        </ToggleButton>
        <ToggleButton
          className={'font-xsm'}
          sx={{fontWeight: '600'}}
          value="hybrid">
          <img src={hybridIcon} alt={'icon'} />
          Hybrid
        </ToggleButton>
      </ToggleButtonGroup>
      <input
        value={searchInput}
        onChange={handleSearchInput}
        placeholder={'Search Driver'}
        className={'search-box'}
      />
    </Box>
  );
}
