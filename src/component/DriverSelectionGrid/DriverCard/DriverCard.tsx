import {Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';

import Person from 'assets/SVG/Person.svg';
import styles from 'styles/design-systems.module.scss';
import './DriverCard.scss';
import {DriverCardProps} from './propTypes/types.ts';

function DriverCard({driver, selectedDriverId}: DriverCardProps) {
  return (
    <Paper
      data-testid={'driver-btn'}
      className={`driver-card ${selectedDriverId == driver.driverId ? 'selected' : ''}`}
      variant="outlined"
      sx={{
        py: {
          sm: 2,
          md: 2,
          lg: 3,
        },
        px: {
          sm: 2,
          md: 2,
          lg: 2,
          xl: 2.5,
        },
        borderRadius: '8px',
        width: {
          sm: '260px',
          md: '350px',
          lg: '97%',
          xl: '98%',
        },
      }}>
      <Stack alignItems="center" direction="row" spacing={1} height={'100%'}>
        {/*Avatar component displays image in a circular icon*/}
        <Avatar
          sx={{
            width: 45,
            height: 45,
            bgcolor: styles.bgSoftAqua,
          }}>
          <img src={Person} alt="no-image-present"></img>
        </Avatar>
        <Box sx={{color: styles.blueSteel}}>
          <Typography
            fontSize={styles.fontSizeMd}
            color={styles.charcoalDark}
            fontWeight={styles.fontWeightBolder}>
            {driver.driverName}
          </Typography>
          <Typography
            fontSize={styles.fontSizeXsm}
            color={styles.grayCharcoal}
            fontWeight={styles.fontWeightLight}>
            {driver.driverId}
          </Typography>
        </Box>
        {/*  This component needs to be wrapped around radio group of mui in its parent component*/}
        {/*  This can be replaced with a simple radio button in case we want to make this component reusable*/}
        {/*  But since it was used only in a single page and mui approach was simpler I used this*/}
        <FormControlLabel
          className={'radio-btn'}
          value={driver.driverId}
          control={<Radio size={'small'} />}
          label={''}
        />
      </Stack>
    </Paper>
  );
}

export default DriverCard;

