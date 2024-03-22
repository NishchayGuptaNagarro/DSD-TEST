import './App.scss';
import {createTheme, ThemeProvider} from '@mui/material';
import Login from './screens/Login/Login.tsx';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {lazy, Suspense} from 'react';
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
          <ScopedCssBaseline>
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
          </ScopedCssBaseline>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
function Loading() {
  return <div>Loading...</div>;
}

export default App;
