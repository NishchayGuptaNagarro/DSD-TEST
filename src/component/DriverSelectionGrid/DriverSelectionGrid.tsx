import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Loading from 'screens/Loading/Loading.tsx';
import DriverCard from './DriverCard/DriverCard.tsx';
import './DriverSelectionGrid.scss';
import {
  DriverNameGridHeaderProps,
  DriverSelectionGridProps,
} from './propTypes/types.ts';

import styles from 'styles/design-systems.module.scss';

import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SearchIcon from 'assets/SVG/SearchIcon.svg';
import {Driver} from 'models/Driver.ts';
import {ChangeEvent, MouseEvent, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';

function DriverSelectionGrid({
  handleDriverSelection,
  driverType,
  isDriverGridLoading,
  driverArray,
  dataLoading = false,
  handleTypeChange,
}: DriverSelectionGridProps) {
  // State containing array filtered after driver type and search text
  const [filteredArray, setFilteredArray] = useState<Driver[]>([]);
  // State containing search text from user
  const [searchText, setSearchText] = useState('');

  // This function filters driver Arrays based on driver type and search text
  function filterDriverArray(searchText: string) {
    setFilteredArray(
      driverArray
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
    value: 'VAN-SELLER' | 'DELIVERY' | 'HYBRID',
  ) {
    handleTypeChange(value);
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
          className="radio-buttons-wrapper"
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
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    // First this function will check if there is a timeout f and will clear it if there is one then it will set a new timeout
    // This is done so that search is only triggered when user finishes typing
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    setSearchInput(event.target.value);

    // Search timeout is set to 300ms can be changed to trigger search faster
    searchTimeout.current = setTimeout(() => {
      searchDriver(event.target.value);
    }, 300);
  }

  return (
    <Stack direction="column" spacing={1} sx={{marginBottom: 2}}>
      <span className={'select-text font-md'}>
        {t('createLoadingOrder.driverTypeText')}
      </span>
      <Box className={'driver-grid-header font-sm'}>
        <Paper elevation={0}>
          <ToggleButtonGroup
            data-testid={'toggle-parent'}
            value={driverType}
            exclusive
            className="toggle-button-group"
            onChange={handleDriverTypeChange}
            size={'small'}>
            <ToggleButton
              className={'font-sm'}
              sx={{
                fontWeight: styles.fontWeightNormal,
                textTransform: 'none',
                paddingX: 2,
                paddingY: 0.5,
              }}
              value="VAN-SELLER">
              {t('createLoadingOrder.vanSeller')}
            </ToggleButton>
            <ToggleButton
              className={'font-sm'}
              sx={{
                fontWeight: styles.fontWeightNormal,
                textTransform: 'none',
                paddingX: 2,
                paddingY: 0.5,
              }}
              value="DELIVERY">
              {t('createLoadingOrder.delivery')}
            </ToggleButton>
            <ToggleButton
              className={'font-sm'}
              sx={{
                fontWeight: styles.fontWeightNormal,
                textTransform: 'none',
                paddingX: 2,
                paddingY: 0.5,
              }}
              value="HYBRID">
              {t('createLoadingOrder.hybrid')}
            </ToggleButton>
          </ToggleButtonGroup>
        </Paper>
        <div className={'search-box'}>
          <TextField
            data-testid={'search-box'}
            value={searchInput}
            onChange={handleSearchInput}
            placeholder={t('createLoadingOrder.searchInput')}
            className={'text-field'}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={SearchIcon} className="icon" alt="Search Icon" />
                </InputAdornment>
              ),
              className: 'search-input',
            }}
          />
        </div>
      </Box>
    </Stack>
  );
}

