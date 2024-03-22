import './App.scss';
import {createTheme, ThemeProvider} from '@mui/material';
import Login from './screens/Login/Login.tsx';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import React, {Suspense} from 'react';
const Sidebar = React.lazy(() => import('./component/Sidebar/Sidebar'));
const Breadcrump = React.lazy(
  () => import('./component/Breadcrump/Breadcrump'),
);

const AvailableStock = React.lazy(
  () => import('./screens/AvailableStock/AvailableStock'),
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

      {/*this baseline provides grey background used in all screens except login so keep all screens inside it except login*/}
      {/* <Login /> */}

      <ThemeProvider theme={theme}>
        <BrowserRouter>
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
              <Route
                path="/breadcrump"
                element={
                  <Suspense fallback={<Loading />}>
                    <Breadcrump />
                  </Suspense>
                }
              />
              <Route path="/login" element={<Login />} />
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
