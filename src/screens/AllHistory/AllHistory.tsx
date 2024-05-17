import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {useTranslation} from 'react-i18next';
import ScreenLayout from 'component/ScreenLayout/ScreenLayout.tsx';
import LanguageSelect from 'component/LanguageSelect/LanguageSelect.tsx';
import PageHeading from 'component/PageHeading/PageHeading.tsx';
import AllHistoryTable from './AllHistoryTable/AllHistoryTable.tsx';
import './AllHistory.scss';

function AllHistory() {
  const {t} = useTranslation();
  const heading = t('history.pageHeading');

  return (
    <ScreenLayout>
      <Stack className={'all-history-screen'}>
        <Box padding={2} paddingBottom={0} position={'relative'}>
          <span className={'history-language-select'}>
            <LanguageSelect />
          </span>
          {/*THESE br will be removed when language selection is added to separate component*/}
          <br />
          <br />
          <PageHeading heading={heading} subHeading={''} />
        </Box>
        <Box padding={2} sx={{textAlign: 'center'}}>
          <AllHistoryTable />
        </Box>
      </Stack>
    </ScreenLayout>
  );
}

export default AllHistory;
