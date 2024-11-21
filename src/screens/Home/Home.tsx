// This screen will display available stock page, it contains sidebar, table and heading
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ListIcon from 'assets/PNG/ListIcon.png';
import DateNavyBlue from 'assets/SVG/DateNavyBlue.svg';
import DotsIcon from 'assets/SVG/DotsIcon.svg';
import PersonBlue from 'assets/SVG/PersonBlue.svg';
import {format} from 'date-fns';
import {Link} from 'react-router-dom';

import Header from 'component/Header/Header';
import {useTranslation} from 'react-i18next';
import './Home.scss';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import NagarroGray from 'assets/PNG/NagarroGray.png';
import DetailsCard from 'component/DetailsCard/DetailsCard';
import NavigationCard from 'component/NavigationCard/NavigationCard';
import {SidebarData} from 'component/SidebarNew/SidebarData';
import styles from 'styles/design-systems.module.scss';

function Home() {
  const {t} = useTranslation();

  return (
    <div className="avl-stock-screen hide-scrollbar">
      <Header>
        <img className="header-icon" src={NagarroGray}></img>
      </Header>
      <Stack className="nav-container">
        <Box paddingLeft={2} marginBottom={'16px'} position={'relative'}>
          <CardStack />
        </Box>
        <Stack
          direction={'row'}
          flexWrap={'wrap'}
          marginBottom={3}
          justifyContent={'space-evenly'}>
          {SidebarData.map(
            (item, index) =>
              index !== 0 && <NavigationCard item={item} key={index} />,
          )}
          <Stack>
            <Card
              className={'create-loading-card'}
              variant={'outlined'}
              sx={{
                borderRadius: 2,
                backgroundColor: styles.bgVibrantOceanBlue,
                position: 'relative',
              }}>
              <CardContent
                sx={{
                  color: styles.whitePure,
                }}>
                <Stack
                  direction="column"
                  justifyContent="space-between"
                  alignItems="start"
                  height="100%"
                  paddingLeft={'6px'}
                  marginBottom={1}
                  marginTop={3}>
                  <div>
                    <div className="list-icon-container">
                      <img
                        className="list-icon"
                        data-testid={'icon'}
                        src={ListIcon}
                        alt={'icon'}
                      />
                    </div>
                    <Typography
                      fontSize={styles.fontSizeXl}
                      fontWeight={styles.fontWeightBolder}>
                      {t('createLoadingOrder.heading')}
                    </Typography>
                    <Typography
                      color={styles.offWhiteGray}
                      fontSize={styles.fontSizeSm}
                      fontWeight={styles.fontWeightLight}>
                      {t('createLoadingOrder.subHeading')}
                    </Typography>
                  </div>
                  <div>
                    <Box
                      sx={{
                        textAlign: 'start',
                        fontSize: styles.fontSizeSm,
                        fontWeight: styles.fontWeightNormal,
                      }}>
                      <Button
                        className="action-btn"
                        sx={{
                          mt: 1,
                          color: styles.bgVibrantOceanBlue,
                          backgroundColor: styles.whitePure,
                        }}
                        variant="contained"
                        size="small"
                        component={Link}
                        to="/stock-check-out/driver">
                        {t('availablestock.creatNow')}
                      </Button>
                    </Box>
                  </div>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Stack>
        <div className="download-container">
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            borderRadius={2}
            sx={{
              background: styles.gradientBlueMist,
              paddingLeft: '3%',
              paddingRight: '2px',
              height: '100px',
              width: '572px',
            }}>
            <Typography
              flex={1}
              color={styles.darkNavy}
              fontSize={styles.fontSizeMd}
              fontWeight={styles.fontWeightNormal}>
              {t('downloadContainer.line1')}
              <br />
              {t('downloadContainer.line2')}
            </Typography>
            <div className="dots-icon-container">
              <img src={DotsIcon} alt="DotsIcon" className="dots-icon" />
              <div className="download-btn-container">
                <Button
                  className="action-btn"
                  sx={{
                    color: styles.charcoalDark,
                    backgroundColor: styles.whitePure,
                    borderRadius: '29px',
                    fontSize: styles.fontSizeXsm,
                    fontWeight: styles.fontWeightNormal,
                    '&:hover': {backgroundColor: styles.bgWhiteSmoke},
                  }}
                  variant="contained"
                  size="small"
                  component={Link}
                  to="">
                  {t('downloadContainer.buttonText')}
                </Button>
              </div>
            </div>
          </Stack>
        </div>
      </Stack>
    </div>
  );
}

export default Home;

// Component containing all cards
function CardStack() {
  const {t} = useTranslation();
  const date = format(new Date(), 'do, MMMM yyyy');
  const user = JSON.parse(
    localStorage.getItem('user') || '{username:"",employee_id:""}',
  );
  const adminMainInfo = `${t('home.welcomeAdmin')} ${user.username?.split(' ')[0] || ''}!`;
  const dateMainInfo = t('home.dateHeading');
  return (
    <Stack direction="row" spacing={3} marginBottom={2} paddingLeft={'2px'}>
      <DetailsCard
        iconBackground={styles.bgTranslucentWhite}
        icon={PersonBlue}
        cardBackground={styles.bgMidnightBlueGray}
        mainInfo={adminMainInfo}
        mainInfoColor={styles.whitePure}
        secondaryInfo={t('home.adminSecondaryHeading')}
        secondaryInfoColor={styles.whitePure}
      />
      <DetailsCard
        iconBackground={styles.bgFrostBlue}
        icon={DateNavyBlue}
        cardBackground={styles.whitePure}
        mainInfo={dateMainInfo}
        mainInfoColor={styles.charcoalDark}
        secondaryInfo={date}
        secondaryInfoColor={styles.grayCharcoal}
      />
    </Stack>
  );
}

