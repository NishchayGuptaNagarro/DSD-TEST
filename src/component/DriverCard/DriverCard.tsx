import Stack from '@mui/material/Stack';
import {Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';

import './DriverCard.scss';
import {DriverCardProps} from './propTypes/types.ts';

function DriverCard({driver, selectedDriverId}: DriverCardProps) {
  return (
    <Paper
      className={`driver-card ${selectedDriverId == driver.driverId ? 'selected' : ''}`}
      variant="outlined"
      sx={{
        p: 0.8,
        borderRadius: 2,
      }}>
      <Stack alignItems="center" direction="row" spacing={1} height={'100%'}>
        {/*Avatar component displays image in a circular icon*/}
        <Avatar
          sx={{
            width: 45,
            height: 45,
            bgcolor: 'rgba(162, 193, 244, 1)',
          }}>
          {driver.driverName.charAt(0)}
        </Avatar>
        <Box sx={{color: 'rgba(52, 71, 103, 1)'}}>
          <Typography className={'font-sm'} fontWeight={500}>
            {driver.driverName}
          </Typography>
          <Typography className={'font-xsm'} fontWeight={400}>
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
