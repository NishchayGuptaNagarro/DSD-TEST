import './App.scss';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import Login from './screens/Login/Login.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {lazy, Suspense} from 'react';
import Loading from './screens/Loading/Loading.tsx';
// const Sidebar = lazy(() => import('./component/Sidebar/Sidebar'));
// const Breadcrump = lazy(() => import('./component/Breadcrump/Breadcrump'));

const AvailableStock = lazy(
  () => import('./screens/AvailableStock/AvailableStock.tsx'),
);
const ForgotPassword = lazy(
  () => import('./screens/ForgotPassword/ForgotPassword.tsx'),
);
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
        <BrowserRouter>
          {/*this baseline provides grey background used in all screens */}
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loading />}>
                  <AvailableStock />
                </Suspense>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/forgotpassword"
              element={
                <Suspense fallback={<Loading />}>
                  <ForgotPassword />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
