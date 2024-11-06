import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppHeader from 'component/AppHeader/AppHeader.tsx';
import DashboardHeaderContent from 'component/DashboardHeaderContent/DashboardHeaderContent.tsx';
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
      <AppHeader>
        <DashboardHeaderContent heading={heading} subHeading={subHeading} />
      </AppHeader>
      <Stack className={'all-history-screen'}>
        <Box padding={2} sx={{textAlign: 'center'}}>
          <AllHistoryTable />
        </Box>
      </Stack>
    </ScreenLayout>
  );
}

export default AllHistory;

