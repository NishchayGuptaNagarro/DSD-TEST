import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DriverNameGridHeader from 'component/DriverNameGridHeader/DriverNameGridHeader.tsx';
import Header from 'component/Header/Header.tsx';
import PageDetails from 'component/PageDetails/PageDetails.tsx';
import ScreenLayout from 'component/ScreenLayout/ScreenLayout.tsx';
import {driverTypes} from 'models/driverTypes.ts';
import {MouseEvent, useState} from 'react';
import {useTranslation} from 'react-i18next';
import './AllHistory.scss';
import AllHistoryTable from './AllHistoryTable/AllHistoryTable.tsx';

function AllHistory() {
  const {t} = useTranslation();
  const heading = t('history.pageHeading');
  const subHeading = t('history.pageSubHeading');
  const [searchText, setSearchText] = useState('');

  const [driverType, setDriverType] = useState<driverTypes>('VAN-SELLER');

  function handleDriverTypeChange(
    _: MouseEvent<HTMLElement>,
    value: driverTypes,
  ) {
    setDriverType(value);
  }

  return (
    <ScreenLayout>
      <Header>
        <PageDetails heading={heading} subHeading={subHeading} />
      </Header>
      <Stack className={'all-history-screen'}>
        <Box padding={2} sx={{textAlign: 'center'}}>
          <DriverNameGridHeader
            driverType={driverType}
            handleDriverTypeChange={handleDriverTypeChange}
            searchDriver={setSearchText}
            showDriverTypeHeader={false}
          />
          <AllHistoryTable driverType={driverType} searchText={searchText} />
        </Box>
      </Stack>
    </ScreenLayout>
  );
}

export default AllHistory;

