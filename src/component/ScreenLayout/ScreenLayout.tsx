import Grid from '@mui/material/Grid';
import Sidebar from 'component/SidebarNew/Sidebar.tsx';
import {ScreenLayoutProps} from './propTypes/types.ts';

function ScreenLayout({children}: ScreenLayoutProps) {
  return (
    <Grid container>
      <Grid height={'100vh'} item xs={2.6} padding={0.3}>
        <Sidebar />
      </Grid>
      <Grid
        className={'avl-stock-screen hide-scrollbar'}
        item
        xs={9.4}
        minHeight={400}
        sx={{maxHeight: '100vh', overflowY: 'scroll'}}>
        {children}
      </Grid>
    </Grid>
  );
}
export default ScreenLayout;

