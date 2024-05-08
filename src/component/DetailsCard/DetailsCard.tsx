import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import './DetailsCard.scss';
import styles from 'styles/design-systems.module.scss';
import {DetailsCardProps} from './propTypes/types.ts';

function DetailsCard({
  heading,
  icon,
  mainInfo,
  secondaryInfo,
}: DetailsCardProps) {
  return (
    // Initial width of card is defined using flexBasis
    <Card
      className={'details-card'}
      variant={'outlined'}
      sx={{borderRadius: 3, flexBasis: 400}}>
      <CardContent
        sx={{
          color: styles.blueSteel,
          padding: 1,
        }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={1}>
          <Typography
            fontSize={styles.fontSizeXsm}
            fontWeight={styles.fontWeightNormal}
            sx={{color: styles.greySoft}}>
            {heading}
          </Typography>
          <img src={icon} alt={'icon'} />
        </Stack>
        <Typography
          fontSize={styles.fontSizeSm}
          fontWeight={styles.fontWeightBolder}>
          {mainInfo}
        </Typography>
        <Typography
          fontSize={styles.fontSizeSm}
          fontWeight={styles.fontWeightLight}>
          {secondaryInfo}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DetailsCard;
