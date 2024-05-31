import Sidebar from './Sidebar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {render, screen} from '@testing-library/react';

describe('sidebar-test', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sidebar />} />
        </Routes>
      </BrowserRouter>,
    );
  });
  test('check-images', () => {
    const logoImage = screen.getByAltText('no-image-present');
    const signOut = screen.getByAltText('signout');
    const settings = screen.getByAltText('settings');
    expect(logoImage).toBeInTheDocument();
    expect(signOut).toBeInTheDocument();
    expect(settings).toBeInTheDocument();
  });

  test('testing-link-settings', () => {
    const settingsLink = screen.getByTestId('settings-id');

    expect(settingsLink).toBeInTheDocument();
    expect(settingsLink).toHaveAttribute('href', '/settings');
  });

  test('renders-signOut-link', () => {
    const signOutLink = screen.getByTestId('signout-id');
    expect(signOutLink).toBeInTheDocument();
  });

  test('submenu-list', () => {
    const submenuList = screen.getByRole('list');
    const submenuListItem = screen.getAllByRole('listitem');
    expect(submenuList).toBeInTheDocument();
    expect(submenuListItem).toHaveLength(3);
  });
});
