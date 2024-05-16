// This screen will display available stock page, it contains sidebar, table and heading
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import {format} from 'date-fns';

import {Link} from 'react-router-dom';
import PageHeading from 'component/PageHeading/PageHeading.tsx';
import DetailsCard from 'component/DetailsCard/DetailsCard.tsx';
import LanguageSelect from 'component/LanguageSelect/LanguageSelect.tsx';

import './Home.scss';
import dateIcon from 'assets/SVG/Date.svg';
import managerIcon from 'assets/SVG/Manager.svg';
import {useTranslation} from 'react-i18next';
import ScreenLayout from 'component/ScreenLayout/ScreenLayout.tsx';
function Home() {
  const {t} = useTranslation();
  // Heading and subheading passed to 'Page Heading' component
  const heading = t('availablestock.pageHeading');
  const subHeading = t('availablestock.subHeading');

  return (
    <ScreenLayout>
      <Stack>
        <Box padding={2} paddingBottom={0} position={'relative'}>
          <span className={'avl-language-select'}>
            <LanguageSelect />
          </span>
          {/*THESE br will be removed when language selection is added to separate component*/}
          <br />
          <br />
          <PageHeading heading={heading} subHeading={subHeading} />
          <CardStack />
        </Box>
        <Box padding={2} sx={{textAlign: 'center'}}>
          <Button
            sx={{mt: 15}}
            variant="contained"
            size="large"
            component={Link}
            to="/stock-check-out/driver">
            {t('availablestock.button')}
          </Button>
        </Box>
      </Stack>
    </ScreenLayout>
  );
}

export default Home;

// Component containing all cards
function CardStack() {
  const {t} = useTranslation();
  const date = format(new Date(), 'dd-MMM-yyyy');
  const day = format(date, 'EEEE');
  const user = JSON.parse(
    localStorage.getItem('user') || '{username:"",employee_id:""}',
  );
  return (
    <Stack direction="row" spacing={3}>
      <DetailsCard
        heading={t('availablestock.card2Heading')}
        icon={managerIcon}
        mainInfo={user.username}
        secondaryInfo={user.employee_id}
      />
      <DetailsCard
        heading={t('availablestock.card3Heading')}
        icon={dateIcon}
        mainInfo={date}
        secondaryInfo={day}
      />
    </Stack>
  );
}
