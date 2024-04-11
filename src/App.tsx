import './App.scss';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import Login from './screens/Login/Login.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {lazy, Suspense} from 'react';
import Loading from './screens/Loading/Loading.tsx';
import TimeLineState from './context/timeline/TimelineState.tsx';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from './resources/labels/en.json';
import frJSON from './resources/labels/fr.json';


const AvailableStock = lazy(
  () => import('./screens/AvailableStock/AvailableStock.tsx'),
);
const ForgotPassword = lazy(
  () => import('./screens/ForgotPassword/ForgotPassword.tsx'),
);
const DriverName = lazy(
  () => import('./component/DriverNameGrid/DriverNameGrid.tsx'),
);

const SelectDriverScreen = lazy(
  () => import('./screens/SelectDriver/SelectDriver.tsx'),
);

const DriverSignature = lazy(
  () => import('./component/DriverSignature/DriverSignature.tsx'),
);

const OrderTable = lazy(() => import('./component/OrderTable/OrderTable.tsx'));


i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    fr: { ...frJSON },
  },
  lng: "en",
});

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
                path="/availablestock"
                element={
                  <Suspense fallback={<Loading />}>
                    <AvailableStock />
                  </Suspense>
                }
              />
              <Route path="/" element={<Login />} />
              <Route
                path="/forgotpassword"
                element={
                  <Suspense fallback={<Loading />}>
                    <ForgotPassword />
                  </Suspense>
                }
              />
              <Route
                path="/createloadingorder"
                element={
                  <Suspense fallback={<Loading />}>
                    <SelectDriverScreen />
                  </Suspense>
                }>
                <Route
                  path="driver"
                  element={
                    <Suspense fallback={<Loading />}>
                      <DriverName />
                    </Suspense>
                  }
                />

                <Route
                  path="order"
                  element={
                    <Suspense fallback={<Loading />}>
                      <OrderTable />
                    </Suspense>
                  }
                />
                <Route
                  path="signature"
                  element={
                    <Suspense fallback={<Loading />}>
                      <DriverSignature />
                    </Suspense>
                  }></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </TimeLineState>
    </>
  );
}

export default App;
