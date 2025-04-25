import {
  Box,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import SearchIcon from 'assets/SVG/SearchIcon.svg';
import {DriverNameGridHeaderProps} from 'component/DriverNameGridHeader/propTypes/types';
import {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';
import {driverRoles} from 'utilities/enums';
import './DriverNameGridHeader.scss';

function DriverNameGridHeader({
  driverType,
  searchDriver,
  handleDriverTypeChange,
  showDriverTypeHeader = true,
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

  useEffect(() => {
    setSearchInput('');
  }, [driverType]);

  return (
    <Stack direction="column" spacing={1} sx={{marginBottom: 2}}>
      {showDriverTypeHeader && (
        <span className={'select-text font-md'}>
          {t('createLoadingOrder.driverTypeText')}
        </span>
      )}
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
              value={driverRoles.VAN_SELLER}>
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
              value={driverRoles.DELIVERY}>
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
              value={driverRoles.HYBRID}>
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

export default DriverNameGridHeader;
