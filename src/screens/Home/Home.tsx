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
      <Header showLanguageSelector={true}>
        <img className="header-icon" src={NagarroGray}></img>
      </Header>
      <Stack className="nav-container">
        <Box marginBottom={'16px'} position={'relative'}>
          <CardStack />
        </Box>
        <Box
          sx={{
            maxWidth: '100%',
            width: '100%',
            rowGap: '7%',
            columnGap: '2%',
            display: 'grid',
            gridTemplateColumns: {
              sm: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
              xl: 'repeat(4, 1fr)',
            },
            marginBottom: 3,
          }}>
          {SidebarData.map(
            (item, index) =>
              index !== 0 && <NavigationCard item={item} key={index} />,
          )}
          <Stack>
            <Card
              variant={'outlined'}
              sx={{
                width: {
                  md: '94%',
                  lg: '98%',
                  xl: '90%',
                },
                height: {
                  md: '256px',
                  lg: '256px',
                  xl: '300px',
                },
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
                          textTransform: 'none',
                        }}
                        variant="contained"
                        size="small"
                        component={Link}
                        to="/stock-check-out/driver"
                        disableElevation>
                        {t('availablestock.creatNow')}
                      </Button>
                    </Box>
                  </div>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>
        <Box
          display={'grid'}
          sx={{
            gridTemplateColumns: {
              sm: 'repeat(4, 1fr)',
            },
            paddingLeft: {
              md: '0.2%',
              lg: '0%',
              xl: '0.6%',
            },
            paddingRight: {
              md: '3%',
              lg: '0.5%',
              xl: '2.4%',
            },
          }}
          className="download-container">
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            borderRadius={2}
            sx={{
              background: styles.gradientBlueMist,
              paddingLeft: '3%',

              height: '100px',
              width: {
                sm: '95%',
                md: '97%',
                lg: '97.5%',
                xl: '96%',
              },
              gridColumn: '3/5',
              justifySelf: 'end',
            }}>
            <Typography
              flex={1}
              sx={{paddingLeft: '2%'}}
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
                    textTransform: 'none',
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
                  to=""
                  disableElevation>
                  {t('downloadContainer.buttonText')}
                </Button>
              </div>
            </div>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
}

export default Home;

// Component containing all cards
function CardStack() {
  const {t} = useTranslation();
  const date = format(new Date(), 'do MMMM, yyyy');
  const user = JSON.parse(
    localStorage.getItem('user') || '{username:"",employee_id:""}',
  );
  const adminMainInfo = `${t('home.welcomeAdmin')} ${user.username?.split(' ')[0] || ''}!`;
  const dateMainInfo = t('home.dateHeading');
  return (
    <Stack
      direction="row"
      columnGap={'3%'}
      marginBottom={2}
      sx={{
        justifyContent: {
          sm: 'inherit',
          md: 'space-between',
          xl: 'inherit',
        },
        paddingRight: {
          md: '3%',
          lg: '0.6%',
          xl: '2%',
        },
      }}
      paddingLeft={'2px'}>
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

