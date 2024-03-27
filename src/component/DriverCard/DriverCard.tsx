import Stack from '@mui/material/Stack';
import {Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import {DriverCardProps} from './propTypes/types.ts';
function DriverCard({driver, selected, handleSelected}: DriverCardProps) {
  return (
    <Paper variant="outlined" sx={{p: 1, borderRadius: 2}}>
      <Stack
        alignItems="center"
        direction="row"
        spacing={1}
        justifyContent={'space-around'}>
        {/*Avatar component displays image in a circular icon*/}
        <Avatar
          sx={{
            width: 45,
            height: 45,
            bgcolor: 'rgba(162, 193, 244, 1)',
          }}>
          {driver.driverName.charAt(0)}
        </Avatar>
        <Stack sx={{color: 'rgba(52, 71, 103, 1)'}}>
          <Typography className={'font-sm'} fontWeight={500}>
            {driver.driverName}
          </Typography>
          <Typography className={'font-xsm'} fontWeight={400}>
            {driver.driverId}
          </Typography>
        </Stack>
        <Radio checked={selected} onChange={handleSelected} size={'small'} />
      </Stack>
    </Paper>
  );
}

export default DriverCard;
