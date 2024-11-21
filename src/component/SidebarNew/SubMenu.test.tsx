import {render, screen} from '@testing-library/react';
import CheckIn from 'assets/SVG/CheckIn.svg';
import CheckOut from 'assets/SVG/CheckOut.svg';
import History from 'assets/SVG/History.svg';
import Home from 'assets/SVG/Home.svg';
import {BrowserRouter} from 'react-router-dom';
import {SidebarOption} from './propTypes/types';
import SubMenu from './SubMenu';

describe('submenu-test', () => {
  const mockHandleSelectedNav = jest.fn();
  const mockData: SidebarOption[] = [
    {
      id: 1,
      title: 'sidebar.home',
      cardTitle: 'sidebar.home',
      path: '/home',
      icon: <img className={'nav-icon'} src={Home} alt="home" />,
      iconSkyBlue: <img className={'nav-icon'} src={Home} alt="home" />,
      iconNavyBlue: <img className={'nav-icon'} src={Home} alt="home" />,
      secondaryInfo: '',
    },
    {
      id: 2,
      title: 'stockcheckout.heading',
      cardTitle: 'stockcheckout.heading',
      path: '/stock-check-out',
      icon: <img className={'nav-icon'} src={CheckOut} alt="stock check out" />,
      iconSkyBlue: <img className={'nav-icon'} src={CheckOut} alt="home" />,
      iconNavyBlue: <img className={'nav-icon'} src={CheckOut} alt="home" />,
      secondaryInfo: '',
    },
    {
      id: 3,
      title: 'stockcheckin.heading',
      cardTitle: 'stockcheckin.heading',
      path: '/stock-check-in',
      icon: <img className={'nav-icon'} src={CheckIn} alt="stock check in" />,
      iconSkyBlue: <img className={'nav-icon'} src={CheckIn} alt="home" />,
      iconNavyBlue: <img className={'nav-icon'} src={CheckIn} alt="home" />,
      secondaryInfo: '',
    },
    {
      id: 4,
      title: 'sidebar.history',
      cardTitle: 'sidebar.history',
      path: '/history',
      icon: <img className={'nav-icon'} src={History} alt={'history'} />,
      iconSkyBlue: <img className={'nav-icon'} src={History} alt="home" />,
      iconNavyBlue: <img className={'nav-icon'} src={History} alt="home" />,
      secondaryInfo: '',
    },
  ];

  test('renders the SubMenu component', () => {
    render(
      <BrowserRouter>
        <SubMenu
          item={mockData[0]}
          selectedNav={1}
          handleSelectedNav={mockHandleSelectedNav}
        />
      </BrowserRouter>,
    );

    // Check if item name is displayed
    const itemName = screen.getByText('Home');
    expect(itemName).toBeInTheDocument();
  });
});

