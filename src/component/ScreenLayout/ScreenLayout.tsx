import Grid from '@mui/material/Grid';
import Sidebar from 'component/Sidebar/Sidebar.tsx';
import {ScreenLayoutProps} from './propTypes/types.ts';

function ScreenLayout({children}: ScreenLayoutProps) {
  return (
    <Grid container>
      <Grid height={'100vh'} item xs={2} padding={1}>
        <Sidebar />
      </Grid>
      <Grid
        className={'avl-stock-screen hide-scrollbar'}
        item
        xs={10}
        minHeight={400}
        sx={{maxHeight: '100vh', overflowY: 'scroll'}}>
        {children}
      </Grid>
    </Grid>
  );
}
export default ScreenLayout;
