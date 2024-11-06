import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Header from 'component/Header/Header.tsx';
import PageDetails from 'component/PageDetails/PageDetails.tsx';
import ScreenLayout from 'component/ScreenLayout/ScreenLayout.tsx';
import {useTranslation} from 'react-i18next';
import './AllHistory.scss';
import AllHistoryTable from './AllHistoryTable/AllHistoryTable.tsx';

function AllHistory() {
  const {t} = useTranslation();
  const heading = t('history.pageHeading');
  const subHeading = t('history.pageSubHeading');

  return (
    <ScreenLayout>
      <Header>
        <PageDetails heading={heading} subHeading={subHeading} />
      </Header>
      <Stack className={'all-history-screen'}>
        <Box padding={2} sx={{textAlign: 'center'}}>
          <AllHistoryTable />
        </Box>
      </Stack>
    </ScreenLayout>
  );
}

export default AllHistory;

