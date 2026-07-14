import {act, render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import Login from './Login.tsx';
import {localStorageMock} from '../../../jest.setup.ts';

beforeEach(() => {
  localStorageMock.clear();
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('Login Screen Tests', () => {
  beforeEach(async () => {
    await act(() => {
      userEvent.setup();
      render(
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path={'/login'} element={<Login />} />
            <Route path={'/home'} element={<div>Home Page</div>} />
            <Route
              path={'/forgotpassword'}
              element={<div>Forgot Password</div>}
            />
          </Routes>
        </MemoryRouter>,
      );
    });
  });

  test('should render login form with all components', () => {
    expect(screen.getByLabelText(/userId/)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /login/})).toBeInTheDocument();
  });

  test('should show validation errors for empty fields on blur', async () => {
    const userIdInput = screen.getByLabelText(/userId/);
    const passwordInput = screen.getByLabelText(/password/);

    await userEvent.click(userIdInput);
    await userEvent.tab();
    await userEvent.click(passwordInput);
    await userEvent.tab();

    expect(screen.getByText('*Required')).toBeInTheDocument();
  });

  test('should enable submit button when both fields are filled', async () => {
    const userIdInput = screen.getByLabelText(/userId/);
    const passwordInput = screen.getByLabelText(/password/);
    const submitBtn = screen.getByRole('button', {name: /login/});

    expect(submitBtn).toBeDisabled();

    await userEvent.type(userIdInput, 'testuser');
    await userEvent.type(passwordInput, 'testpass');

    expect(submitBtn).not.toBeDisabled();
  });

  test('should navigate to forgot password page on link click', async () => {
    const forgotLink = screen.getByText(/forgotPassword/);
    await userEvent.click(forgotLink);
    expect(screen.getByText('Forgot Password')).toBeInTheDocument();
  });
});
