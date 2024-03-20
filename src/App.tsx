import './App.scss';
import {createTheme, ThemeProvider} from '@mui/material';
import Login from './screens/Login/Login.tsx';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
// import AvailableStock from './screens/AvailableStock/AvailableStock.tsx';
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: '"Montserrat", sans-serif',
    },
    palette: {
      background: {
        default: '#F1F2F6',
      },
    },
  });
  return (
    <>
      {/*Make sure all components using material ui goes inside this*/}
      <ThemeProvider theme={theme}>
        {/*this baseline provides grey background used in all screens except login so keep all screens inside it except login*/}
        <ScopedCssBaseline>{/*<AvailableStock />*/}</ScopedCssBaseline>
        <Login />
      </ThemeProvider>
    </>
  );
}

export default App;
