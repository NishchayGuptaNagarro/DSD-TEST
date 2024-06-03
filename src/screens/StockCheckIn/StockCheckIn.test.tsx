import {act, render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import TimelineState from '../../context/timeline/TimelineState.tsx';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import StockCheckIn from './StockCheckIn.tsx';
import PendingSelectionGrid from './PendingSelectionGrid/PendingSelectionGrid.tsx';
import TransactionTable from './TransactionTable/TransactionTable.tsx';
import StockTable from './StockTable/StockTable.tsx';
import AttachmentTable from './AttachmentTable/AttachmentTable.tsx';
import AdminSignature from './AdminSignature/AdminSignature.tsx';
import {localStorageMock} from '../../../jest.setup.ts';
import {RefObject} from 'react';

jest.mock('react-signature-canvas', () => {
  const {forwardRef} = jest.requireActual('react');
  return {
    __esModule: true,
    default: forwardRef(
      (props: {onEnd: () => void}, ref: RefObject<unknown>) => {
        console.log(ref);
        return (
          <button
            type={'button'}
            data-testid={'mock-btn'}
            onClick={props.onEnd}
          />
        );
      },
    ),
  };
});

describe('Stock Check In Screen Tests', () => {
  afterAll(sessionStorage.clear);
  beforeEach(async () => {
    await act(() => {
      userEvent.setup();
      window.sessionStorage.setItem('selected_driver', 'CA1051');
      window.sessionStorage.setItem('selected_driver_type', 'VAN-SELLER');
      render(
        <TimelineState>
          <MemoryRouter initialEntries={['/stock-check-in']}>
            <Routes>
              <Route path={'/home'} element={<div>Mock Home</div>} />
              <Route path={'/stock-check-in'} element={<StockCheckIn />}>
                <Route path="driver" element={<PendingSelectionGrid />} />
                <Route path="history" element={<TransactionTable />} />
                <Route path="stock" element={<StockTable />} />
                <Route path="attachment" element={<AttachmentTable />} />
                <Route path="signature" element={<AdminSignature />} />
              </Route>
            </Routes>
          </MemoryRouter>
        </TimelineState>,
      );
    });
  });
  async function navigateSteps(btn: HTMLElement, steps: number) {
    for (let i = 1; i < steps; i++) {
      await userEvent.click(btn);
    }
  }

  test('should have all components', () => {
    expect(screen.getByTestId('timeline')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-parent')).toBeInTheDocument();
    expect(screen.getByTestId('language-select')).toBeInTheDocument();
  });

  test('should have all steps in timeline', () => {
    expect(screen.getAllByTestId('step')).toHaveLength(5);
  });
  test('should have next enabled', async () => {
    const btn = screen.getByText(/next/);
    expect(btn).not.toBeDisabled();
  });
  test('should have table when we reach step 2', async () => {
    const btn = screen.getByText(/next/);
    await navigateSteps(btn, 2);
    const row = await screen.findAllByRole('row');
    expect(localStorageMock.getAll().currentStep).toBe('2');
    expect(row).toHaveLength(6); //1 header + 5 Data
  });

  test('should have stock table when we reach step 3', async () => {
    const btn = screen.getByText(/next/);
    await navigateSteps(btn, 3);
    const row = screen.getAllByRole('row');
    expect(localStorageMock.getAll().currentStep).toBe('3');
    expect(row).toHaveLength(1); //1 header
    expect(screen.getAllByRole('columnheader')).toHaveLength(3);
  });

  test('should have attachment table when we reach step 4', async () => {
    const btn = screen.getByText(/next/);
    await navigateSteps(btn, 4);
    const row = screen.getAllByRole('row');
    expect(localStorageMock.getAll().currentStep).toBe('4');
    expect(row).toHaveLength(1); //1 header
    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
  });

  test('should have send signature form when we reach step 5', async () => {
    const nextBtn = screen.getByText(/next/);
    await navigateSteps(nextBtn, 5);
    expect(localStorageMock.getAll().currentStep).toBe('5');

    expect(screen.queryByText(/next/)).not.toBeInTheDocument();

    const finishBtn = screen.getByText(/finish/);
    expect(finishBtn).toBeInTheDocument();
    expect(screen.getByTestId('admin-signature-form')).toBeInTheDocument();
  });
  test('should return to home after we send signature', async () => {
    const nextBtn = screen.getByText(/next/);
    await navigateSteps(nextBtn, 5);
    const mockBtn = screen.getByTestId('mock-btn');

    await userEvent.click(mockBtn);

    const finishBtn = screen.getByText(/finish/);
    await userEvent.click(finishBtn);
    const dismissBtn = screen.getByTestId('dismiss-btn');
    await userEvent.click(dismissBtn);
    expect(screen.getByText('Mock Home')).toBeInTheDocument();
  });
});
