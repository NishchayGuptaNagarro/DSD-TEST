import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Avatar from '@mui/material/Avatar';
import styles from 'styles/design-systems.module.scss';
import './DetailsCard.scss';
import {DetailsCardProps} from './propTypes/types.ts';

function DetailsCard({
  iconBackground,
  icon,
  cardBackground,
  mainInfo,
  mainInfoColor,
  secondaryInfo,
  secondaryInfoColor,
}: DetailsCardProps) {
  return (
    // Initial width of card is defined using flexBasis
    <Card
      className={'details-card'}
      variant={'outlined'}
      sx={{
        borderRadius: 3,
        flexBasis: 650,
        height: 110,
        backgroundColor: cardBackground,
      }}>
      <CardContent
        sx={{
          padding: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          width={'100%'}
          height={'100%'}>
          <div className="icon-container">
            <Avatar
              sx={{
                width: '60px',
                height: '60px',
                bgcolor: iconBackground,
              }}>
              <img src={icon} alt="no-image-present"></img>
            </Avatar>
          </div>
          <div className="info-container">
            <Typography
              fontSize={styles.fontSizeXl}
              fontWeight={styles.fontWeightNormal}
              sx={{color: mainInfoColor}}>
              {mainInfo}
            </Typography>
            <Typography
              fontSize={styles.fontSizeMd}
              fontWeight={styles.fontWeightNormal}
              sx={{color: secondaryInfoColor}}>
              {secondaryInfo}
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DetailsCard;

