import {act, render, screen, waitFor, within} from '@testing-library/react';
import StockCheckOut from './StockCheckOut.tsx';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import DriverNameGrid from './DriverNameGrid/DriverNameGrid.tsx';
import DriverSignature from './DriverSignature/DriverSignature.tsx';
import OrderTable from './OrderTable/OrderTable.tsx';
import TimelineState from 'context/timeline/TimelineState.tsx';
import {localStorageMock} from '../../../jest.setup.ts';
import {userEvent} from '@testing-library/user-event';

describe('Stock Check Out Screen Tests For VAN SELLER', () => {
  afterAll(sessionStorage.clear);

  beforeEach(async () => {
    await act(async () => {
      userEvent.setup();
      window.sessionStorage.setItem('selected_driver', 'user_id_1');
      window.sessionStorage.setItem('selected_driver_type', 'VAN-SELLER');
      render(
        <TimelineState>
          <MemoryRouter initialEntries={['/stock-check-out']}>
            <Routes>
              <Route path={'/home'} element={<div>Mock Home</div>} />
              <Route path={'/stock-check-out'} element={<StockCheckOut />}>
                <Route path="driver" element={<DriverNameGrid />} />
                <Route path="order" element={<OrderTable />} />
                <Route path="signature" element={<DriverSignature />} />
              </Route>
            </Routes>
          </MemoryRouter>
        </TimelineState>,
      );
    });
  });

  test('should have all components', () => {
    expect(screen.getByTestId('timeline')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-parent')).toBeInTheDocument();
    expect(screen.getByTestId('language-select')).toBeInTheDocument();
  });
  test('should have all received drivers from api', () => {
    const drivers = screen.getAllByTestId('driver-btn');
    expect(drivers).toHaveLength(2);
  });
  test('should change timeline on click', async () => {
    const toggleParent = screen.getByTestId('toggle-parent');
    const toggleBtnArr = within(toggleParent).getAllByRole('button');
    expect(screen.getAllByTestId('step')).toHaveLength(3);
    await userEvent.click(toggleBtnArr[1]);
    expect(screen.getAllByTestId('step')).toHaveLength(4);
    await userEvent.click(toggleBtnArr[2]);
    expect(screen.getAllByTestId('step')).toHaveLength(5);
  });

  test('should have next enabled', async () => {
    const btn = screen.getByText(/next/);
    expect(btn).not.toBeDisabled();
  });
  test('should have current step 2 in localStorage when we click next', async () => {
    const btn = screen.getByText(/next/);
    await userEvent.click(btn);
    expect(localStorageMock.getAll().currentStep).toBe('2');
  });
  test('should have table when we reach step 2', async () => {
    const btn = screen.getByText(/next/);
    await userEvent.click(btn);
    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(2);
    });
  });
  test('should have get signature form when we reach step 3', async () => {
    const nextBtn = screen.getByText(/next/);
    await userEvent.click(nextBtn);
    await userEvent.click(nextBtn);
    expect(localStorageMock.getAll().currentStep).toBe('3');

    expect(screen.queryByText(/next/)).not.toBeInTheDocument();

    const finishBtn = screen.getByText(/finish/);
    expect(finishBtn).toBeInTheDocument();
    expect(screen.getByTestId('driver-signature-form')).toBeInTheDocument();
  });
  test('should get signature on button click and finish should navigate to home', async () => {
    const nextBtn = screen.getByText(/next/);
    await userEvent.click(nextBtn);
    await userEvent.click(nextBtn);

    const signatureBtn = screen.getByTestId('get-signature-btn');
    await userEvent.click(signatureBtn);
    expect(screen.getByAltText('img')).toBeInTheDocument();
    const finishBtn = screen.getByText(/finish/);
    await userEvent.click(finishBtn);
    const dismissBtn = screen.getByTestId('dismiss-btn');
    await userEvent.click(dismissBtn);
    expect(screen.getByText('Mock Home')).toBeInTheDocument();
  });
});
