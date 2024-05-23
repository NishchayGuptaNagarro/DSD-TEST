import DashBoard from 'assets/PNG/Dashboard.png';
import Stocks from 'assets/PNG/Stocks.png';
import Orders from 'assets/PNG/Orders.png';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {SidebarOption} from './propTypes/types.ts';

export const SidebarData: SidebarOption[] = [
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
  {
    title: 'sidebar.history',
    path: '/history',
    icon: <img className={'nav-icon'} src={Orders} alt={'history'} />,
  },
];
