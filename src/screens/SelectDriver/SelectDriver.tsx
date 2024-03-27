import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Sidebar from '../../component/Sidebar/Sidebar.tsx';
import PageHeading from '../../component/PageHeading/PageHeading.tsx';
import Paper from '@mui/material/Paper';
import DriverCard from '../../component/DriverCard/DriverCard.tsx';
import {Container} from '@mui/material';

function SelectDriver() {
  const heading = 'Create Loading Order';
  const subHeading = 'To create a loading order, Please follow the steps';
  return (
    <Grid container>
      <Grid item xs={2} padding={1}>
        <Sidebar />
      </Grid>
      <Grid item xs={10} sx={{height: '100vh', overflowY: 'scroll'}}>
        <Stack>
          <Box padding={2} paddingBottom={0} textAlign={'center'}>
            <PageHeading heading={heading} subHeading={subHeading} />
          </Box>
          <Container>
            <Paper elevation={1} sx={{p: 1.5}}>
              <CardGrid />
            </Paper>
          </Container>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default SelectDriver;

function CardGrid() {
  return (
    <Box display={'grid'} gap={2} gridTemplateColumns={'repeat(4,1fr)'}>
      <DriverCard
        driver={{driverName: 'driver', driverId: 'D10'}}
        selected={false}
        handleSelected={() => {
          console.log('i was clicked');
        }}
      />
      <DriverCard
        driver={{driverName: 'driver', driverId: 'D10'}}
        selected={false}
        handleSelected={() => {
          console.log('i was clicked');
        }}
      />
      <DriverCard
        driver={{driverName: 'driver', driverId: 'D10'}}
        selected={false}
        handleSelected={() => {
          console.log('i was clicked');
        }}
      />
    </Box>
  );
}
