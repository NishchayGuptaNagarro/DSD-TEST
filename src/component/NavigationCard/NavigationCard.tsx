import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import RightArrow from 'assets/SVG/RightArrow.svg';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import styles from 'styles/design-systems.module.scss';
import './NavigationCard.scss';
import {NavigationCardProps} from './propTypes/types.ts';

function NavigationCard({item}: NavigationCardProps) {
  const {t} = useTranslation();
  const navigate = useNavigate();
  return (
    <Stack>
      <Card
        className={'navigation-card'}
        variant={'outlined'}
        sx={{
          borderRadius: 2,
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
        }}>
        <CardActionArea
          onClick={() => navigate(item.path)}
          sx={{cursor: 'pointer', height: '100%'}}>
          <CardContent sx={{height: '100%'}}>
            <Stack
              direction="column"
              justifyContent="space-between"
              alignItems="start"
              height="100%"
              marginBottom={1}
              sx={{position: 'relative'}}>
              <div className="card-icon-container">
                <Avatar
                  sx={{
                    display: 'flex',
                    width: 50,
                    height: 50,
                    bgcolor: styles.bgFrostBlue,
                  }}>
                  {item.iconNavyBlue}
                </Avatar>
              </div>
              <div className="card-text-container">
                <Typography
                  color={styles.charcoalDark}
                  fontSize={styles.fontSizeXl}
                  fontWeight={styles.fontWeightBolder}>
                  {t(item.cardTitle)}
                </Typography>
                <Typography
                  color={styles.grayCharcoal}
                  fontSize={styles.fontSizeSm}
                  fontWeight={styles.fontWeightLight}>
                  {t(item.secondaryInfo)}
                </Typography>
              </div>
              <div className="bottom-icon-container">
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: styles.bgSilverMist,
                  }}>
                  <img
                    className="bottom-icon"
                    data-testid={'icon'}
                    src={RightArrow}
                    alt={'icon'}
                  />
                </Avatar>
              </div>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Stack>
  );
}
export default NavigationCard;
