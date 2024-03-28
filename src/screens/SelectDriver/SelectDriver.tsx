import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Sidebar from '../../component/Sidebar/Sidebar.tsx';
import PageHeading from '../../component/PageHeading/PageHeading.tsx';
import Paper from '@mui/material/Paper';
import {Container} from '@mui/material';
import {Driver} from './propTypes/types.ts';
import {ChangeEvent, useState} from 'react';
import DriverNameGrid from '../../component/DriverNameGrid/DriverNameGrid.tsx';

function SelectDriver() {
  const heading = 'Create Loading Order';
  const subHeading = 'To create a loading order, Please follow the steps';

  //MOCK DATA
  const driverArray: Driver[] = [
    {driverId: 'DRV001', driverName: 'Lewis Hamilton'},
    {driverId: 'DRV002', driverName: 'Max Verstappen'},
    {driverId: 'DRV003', driverName: 'Fernando Alonso'},
    {driverId: 'DRV004', driverName: 'Charles Leclerc'},
    {driverId: 'DRV005', driverName: 'Sergio Perez'},
    {driverId: 'DRV006', driverName: 'Sebastian Vettel'},
    {driverId: 'DRV007', driverName: 'Lando Norris'},
    {driverId: 'DRV008', driverName: 'Daniel Ricciardo'},
  ];

  const [selectedDriver, setSelectedDriver] = useState<string>('');

  function handleDriverSelection(event: ChangeEvent<HTMLInputElement>) {
    setSelectedDriver(event.target.value);
    console.log(event.target.value);
  }
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
              <DriverNameGrid
                driverArray={driverArray}
                selectedDriverId={selectedDriver}
                handleDriverSelection={handleDriverSelection}
              />
            </Paper>
          </Container>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default SelectDriver;
