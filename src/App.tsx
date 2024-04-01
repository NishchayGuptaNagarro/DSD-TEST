import './App.scss';
import {createTheme, CssBaseline, Select, ThemeProvider} from '@mui/material';
import Login from './screens/Login/Login.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {lazy, Suspense} from 'react';
import Loading from './screens/Loading/Loading.tsx';
import TimeLineState from './context/timeline/TimelineState.tsx';

const AvailableStock = lazy(
  () => import('./screens/AvailableStock/AvailableStock.tsx'),
);
const ForgotPassword = lazy(
  () => import('./screens/ForgotPassword/ForgotPassword.tsx'),
);

const TimeLine = lazy(() => import('./component/Timeline/Timeline.tsx'));
const SelectDriver = lazy(
  () => import('./component/Timeline/SelectDriver.tsx'),
);
const Verification = lazy(
  () => import('./component/Timeline/Verification.tsx'),
);

const ActiveDriver = lazy(
  () => import('./component/Timeline/ActiveDriver.tsx'),
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
      <TimeLineState>
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
              <Route
                path="/timeline"
                element={
                  <Suspense fallback={<Loading />}>
                    <TimeLine />
                  </Suspense>
                }>
                <Route
                  path="select"
                  element={
                    <Suspense fallback={<Loading />}>
                      <SelectDriver />
                    </Suspense>
                  }
                />
                <Route
                  path="verification"
                  element={
                    <Suspense fallback={<Loading />}>
                      <Verification />
                    </Suspense>
                  }
                />

                <Route
                  path="activation"
                  element={
                    <Suspense fallback={<Loading />}>
                      <ActiveDriver />
                    </Suspense>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </TimeLineState>
    </>
  );
}

export default App;
