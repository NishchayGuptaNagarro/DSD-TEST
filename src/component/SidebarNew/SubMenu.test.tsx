import SubMenu from './SubMenu';
import DashBoard from 'assets/PNG/Dashboard.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Stocks from 'assets/PNG/Stocks.png';
import {SidebarOption} from './propTypes/types';
import {fireEvent, render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

describe('submenu-test', () => {
  const mockData: SidebarOption[] = [
    {
      title: 'sidebar.home',
      path: '/home',
      icon: <img className={'nav-icon'} src={DashBoard} alt="home" />,
    },
    {
      title: 'sidebar.stock',
      path: '',
      icon: <img className={'nav-icon'} src={Stocks} alt="stocks" />,
      iconClosed: <KeyboardArrowDownIcon fontSize={'small'} />,
      iconOpened: <KeyboardArrowUpIcon fontSize={'small'} />,

      subNav: [
        {
          title: 'stockcheckin.heading',
          path: '/stock-check-in',
          icon: <LocalShippingIcon className={'nav-icon'} />,
          cName: 'sub-nav',
        },
        {
          title: 'stockcheckout.heading',
          path: '/stock-check-out',
          icon: <ShoppingCartIcon className={'nav-icon'} />,
          cName: 'sub-nav',
        },
      ],
    },
  ];
  test('submenu-present', () => {
    render(
      <BrowserRouter>
        <SubMenu item={mockData[1]} key={1} />
      </BrowserRouter>,
    );
    const subnavPresent = screen.getByTestId('subnav-present');

    expect(subnavPresent).toBeInTheDocument();
  });

  test('submenu-absent', () => {
    render(
      <BrowserRouter>
        <SubMenu item={mockData[0]} key={0} />
      </BrowserRouter>,
    );

    const subnavAbsent = screen.getByTestId('subnav-absent');
    expect(subnavAbsent).toBeInTheDocument();
  });

  test('submenu-dropdown-list', () => {
    render(
      <BrowserRouter>
        <SubMenu item={mockData[1]} key={1} subnav={true} />
      </BrowserRouter>,
    );
    const dataSubmenuList = screen.getByTestId('sidebar-submenu-options');
    expect(dataSubmenuList).toBeInTheDocument();
  });

  test('link-tag-count', () => {
    render(
      <BrowserRouter>
        <SubMenu item={mockData[1]} key={1} subnav={true} />
      </BrowserRouter>,
    );
    const linkTag = screen.getAllByRole('link');
    expect(linkTag).toHaveLength(2);
  });

  test('calls-showSubnav-button-click', () => {
    const showSubnavMock = jest.fn();
    render(
      <BrowserRouter>
        <SubMenu
          item={mockData[0]}
          key={0}
          subnav={false}
          showSubnav={showSubnavMock}
        />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByTestId('subnav-absent'));
    expect(showSubnavMock).toHaveBeenCalledTimes(1);
  });

  test('calls-showSubnav-button-click-button', () => {
    const showSubnavMock = jest.fn();
    render(
      <BrowserRouter>
        <SubMenu
          item={mockData[1]}
          key={1}
          subnav={true}
          showSubnav={showSubnavMock}
        />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByTestId('subnav-present'));
    expect(showSubnavMock).toHaveBeenCalledTimes(1);
  });

  test('icon-test', () => {
    const showSubnavMock = jest.fn();
    render(
      <BrowserRouter>
        <SubMenu
          item={mockData[1]}
          key={1}
          subnav={true}
          showSubnav={showSubnavMock}
        />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('KeyboardArrowUpIcon')).toBeInTheDocument();
  });

  test('icon-test', () => {
    const showSubnavMock = jest.fn();
    render(
      <BrowserRouter>
        <SubMenu
          item={mockData[1]}
          key={1}
          subnav={false}
          showSubnav={showSubnavMock}
        />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('KeyboardArrowDownIcon')).toBeInTheDocument();
  });
});
