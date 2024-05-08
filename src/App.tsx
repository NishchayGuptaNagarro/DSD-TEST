import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';

import {lazy, Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from 'screens/Login/Login.tsx';
import Loading from 'screens/Loading/Loading.tsx';
import TimelineState from 'context/timeline/TimelineState.tsx';

import 'App.scss';
import styles from 'styles/design-systems.module.scss';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enJSON from 'resources/labels/en.json';
import frJSON from 'resources/labels/fr.json';
import ProtectedRoute from 'component/ProtectedRoute/ProtectedRoute.tsx';

const AvailableStock = lazy(() => import('screens/Home/Home.tsx'));
const ForgotPassword = lazy(
  () => import('screens/ForgotPassword/ForgotPassword.tsx'),
);
const DriverNameGrid = lazy(
  () => import('screens/SelectDriver/DriverNameGrid/DriverNameGrid.tsx'),
);
const SelectDriverScreen = lazy(
  () => import('screens/SelectDriver/SelectDriver.tsx'),
);
const DriverSignatureForm = lazy(
  () => import('screens/SelectDriver/DriverSignature/DriverSignature.tsx'),
);
const OrderTable = lazy(
  () => import('screens/SelectDriver/OrderTable/OrderTable.tsx'),
);
const DeliveryTable = lazy(
  () => import('screens/SelectDriver/DeliveryTable/DeliveryTable.tsx'),
);

i18n.use(initReactI18next).init({
  resources: {
    en: {translation: {...enJSON}},
    fr: {translation: {...frJSON}},
  },
  lng: 'en',
  fallbackLng: 'en',
});

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: '"Montserrat", sans-serif',
    },
    palette: {
      background: {
        default: styles.bgColorBeigeLight,
      },
    },
  });
  return (
    <>
      {/*Make sure all components using material ui goes inside this*/}

      <ThemeProvider theme={theme}>
        <TimelineState>
          <BrowserRouter>
            {/*this baseline provides grey background used in all screens */}
            <CssBaseline />
            <Routes>
              <Route
                path="/home"
                element={
                  <Suspense fallback={<Loading />}>
                    <ProtectedRoute>
                      <AvailableStock />
                    </ProtectedRoute>
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
                    <ProtectedRoute>
                      <SelectDriverScreen />
                    </ProtectedRoute>
                  </Suspense>
                }>
                <Route
                  path="driver"
                  element={
                    <Suspense fallback={<Loading />}>
                      <DriverNameGrid />
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
                  path="delivery-table"
                  element={
                    <Suspense fallback={<Loading />}>
                      <DeliveryTable />
                    </Suspense>
                  }
                />
                <Route
                  path="signature"
                  element={
                    <Suspense fallback={<Loading />}>
                      <DriverSignatureForm />
                    </Suspense>
                  }></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </TimelineState>
      </ThemeProvider>
    </>
  );
}

export default App;
