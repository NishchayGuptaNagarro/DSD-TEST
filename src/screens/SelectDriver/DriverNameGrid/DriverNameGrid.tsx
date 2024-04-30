import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import {DriverNameGridHeaderProps} from './propTypes/types.ts';
import {DriverOutletContext} from '../propTypes/types.ts';
import DriverCard from './DriverCard/DriverCard.tsx';
import './DriverNameGrid.scss';
import styles from '../../../styles/design-systems.module.scss';

import vanSellerIcon from '../../../assets/SVG/VanSeller.svg';
import deliveryIcon from '../../../assets/SVG/Delivery.svg';
import hybridIcon from '../../../assets/SVG/Hybrid.svg';

import {useState, MouseEvent, ChangeEvent, useRef, useEffect} from 'react';
import {useOutletContext} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Driver} from '../../../models/driver.ts';
import Loading from '../../Loading/Loading.tsx';

function DriverNameGrid() {
  // Getting required props from outlet context
  const {
    isDriverGridLoading,
    driverArray,
    selectedDriverId,
    handleDriverSelection,
  } = useOutletContext<DriverOutletContext>();

  // State containing driver type
  const [driverType, setDriverType] = useState<
    'VAN-SELLER' | 'DELIVERY' | 'HYBRID'
  >('VAN-SELLER');

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
  function handleDriverTypeChange(
    _: MouseEvent<HTMLElement>,
    value: 'VAN-SELLER' | 'DELIVERY' | 'HYBRID',
  ) {
    setDriverType(value);
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
        <RadioGroup
          name="controlled-radio-buttons-group"
          value={selectedDriverId}
          onChange={handleDriverSelection}
          sx={{
            display: 'grid',
            gap: 1,
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
}

export default DriverNameGrid;

// Grid Header Component
function DriverNameGridHeader({
  driverType,
  searchDriver,
  handleDriverTypeChange,
}: DriverNameGridHeaderProps) {
  const {t} = useTranslation();
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
      <span className={'select-text'}>
        {t('createLoadingOrder.driverTypeText')}:
      </span>
      <ToggleButtonGroup
        color="primary"
        value={driverType}
        exclusive
        onChange={handleDriverTypeChange}
        size={'small'}>
        <ToggleButton
          className={'font-xsm'}
          sx={{fontWeight: styles.fontWeightBolder}}
          value="VAN-SELLER">
          <img src={vanSellerIcon} alt={'icon'} />
          {t('createLoadingOrder.vanSeller')}
        </ToggleButton>

        <ToggleButton
          className={'font-xsm'}
          sx={{fontWeight: styles.fontWeightBolder}}
          value="DELIVERY">
          <img src={deliveryIcon} alt={'icon'} />
          {t('createLoadingOrder.delivery')}
        </ToggleButton>
        <ToggleButton
          className={'font-xsm'}
          sx={{fontWeight: styles.fontWeightBolder}}
          value="HYBRID">
          <img src={hybridIcon} alt={'icon'} />
          {t('createLoadingOrder.hybrid')}
        </ToggleButton>
      </ToggleButtonGroup>
      <input
        value={searchInput}
        onChange={handleSearchInput}
        placeholder={t('createLoadingOrder.searchInput')}
        className={'search-box'}
      />
    </Box>
  );
}
