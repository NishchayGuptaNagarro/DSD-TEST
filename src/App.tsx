import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import React, {Suspense} from 'react';
const Sidebar = React.lazy(() => import('./component/Sidebar/Sidebar'));
const Breadcrump = React.lazy(
  () => import('./component/Breadcrump/Breadcrump'),
);

const AvailableStock = React.lazy(
  () => import('./screens/AvailableStock/AvailableStock'),
);

function App() {
  return (
    <>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Loading() {
  return <div>Loading...</div>;
}

export default App;
