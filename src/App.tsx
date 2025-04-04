import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';

import i18n from 'i18next';
import {lazy, Suspense} from 'react';
import {initReactI18next} from 'react-i18next';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import ProtectedRoute from 'component/ProtectedRoute/ProtectedRoute.tsx';
import TimelineState from 'context/timeline/TimelineState.tsx';
import Loading from 'screens/Loading/Loading.tsx';
import Login from 'screens/Login/Login.tsx';

import 'App.scss';
import SidebarState from 'context/sidebar/sidebarState';
import enJSON from 'resources/labels/en.json';
import frJSON from 'resources/labels/fr.json';
import styles from 'styles/design-systems.module.scss';
import {languages} from 'utilities/enums';

const Home = lazy(() => import('screens/Home/Home.tsx'));
const History = lazy(() => import('screens/AllHistory/AllHistory.tsx'));
const ForgotPassword = lazy(
  () => import('screens/ForgotPassword/ForgotPassword.tsx'),
);
const DriverNameGrid = lazy(
  () => import('screens/StockCheckOut/DriverNameGrid/DriverNameGrid.tsx'),
);
const StockCheckoutScreen = lazy(
  () => import('screens/StockCheckOut/StockCheckOut.tsx'),
);
const DriverSignatureForm = lazy(
  () => import('screens/StockCheckOut/DriverSignature/DriverSignature.tsx'),
);
const OrderTable = lazy(
  () => import('screens/StockCheckOut/OrderTable/OrderTable.tsx'),
);
const StockCheckInScreen = lazy(
  () => import('screens/StockCheckIn/StockCheckIn.tsx'),
);
const PendingCheckInSelection = lazy(
  () =>
    import(
      'screens/StockCheckIn/PendingSelectionGrid/PendingSelectionGrid.tsx'
    ),
);
const HistoryTable = lazy(
  () => import('screens/StockCheckIn/TransactionTable/TransactionTable.tsx'),
);
const StockTable = lazy(
  () => import('screens/StockCheckIn/StockTable/StockTable.tsx'),
);
const AttachmentTable = lazy(
  () => import('screens/StockCheckIn/AttachmentTable/AttachmentTable.tsx'),
);
const AdminSignature = lazy(
  () => import('screens/StockCheckIn/AdminSignature/AdminSignature.tsx'),
);

const MyOrders = lazy(
  () => import('screens/StockCheckOut/MyOrder/MyOrder.tsx'),
);


const initialLanguage =
  localStorage.getItem('currentLanguage') || languages.ENGLISH;
i18n.use(initReactI18next).init({
  resources: {
    en: {translation: {...enJSON}},
    fr: {translation: {...frJSON}},
  },
  lng: initialLanguage,
  fallbackLng: languages.ENGLISH,
});

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins", sans-serif',
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
        <SidebarState>
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
                        <Home />
                      </ProtectedRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="/history"
                  element={
                    <Suspense fallback={<Loading />}>
                      <ProtectedRoute>
                        <History />
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
                  path="/stock-check-out"
                  element={
                    <Suspense fallback={<Loading />}>
                      <ProtectedRoute>
                        <StockCheckoutScreen />
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
                    path="my-order"
                    element={
                      <Suspense fallback={<Loading />}>
                        <MyOrders />
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
                        <OrderTable />
                      </Suspense>
                    }
                  />
                  <Route
                    path="signature"
                    element={
                      <Suspense fallback={<Loading />}>
                        <DriverSignatureForm />
                      </Suspense>
                    }
                  />
                </Route>
                <Route
                  path="/stock-check-in"
                  element={
                    <Suspense fallback={<Loading />}>
                      <ProtectedRoute>
                        <StockCheckInScreen />
                      </ProtectedRoute>
                    </Suspense>
                  }>
                  <Route
                    path="driver"
                    element={
                      <Suspense fallback={<Loading />}>
                        <PendingCheckInSelection />
                      </Suspense>
                    }
                  />
                  <Route
                    path="history"
                    element={
                      <Suspense fallback={<Loading />}>
                        <HistoryTable />
                      </Suspense>
                    }
                  />
                  <Route
                    path="stock"
                    element={
                      <Suspense fallback={<Loading />}>
                        <StockTable />
                      </Suspense>
                    }
                  />
                  <Route
                    path="attachment"
                    element={
                      <Suspense fallback={<Loading />}>
                        <AttachmentTable />
                      </Suspense>
                    }
                  />
                  <Route
                    path="signature"
                    element={
                      <Suspense fallback={<Loading />}>
                        <AdminSignature />
                      </Suspense>
                    }
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </TimelineState>
        </SidebarState>
      </ThemeProvider>
    </>
  );
}

export default App;

