import DashBoard from 'assets/PNG/Dashboard.png';
import Stocks from 'assets/PNG/Stocks.png';
import Orders from 'assets/PNG/Orders.png';

import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
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
    iconClosed: <MdOutlineKeyboardArrowDown />,
    iconOpened: <MdOutlineKeyboardArrowUp />,

    subNav: [
      {
        title: 'Stock Check-In',
        path: '/stock-check-in',
        icon: <img className={'nav-icon'} src={Stocks} alt="stocks" />,
        cName: 'sub-nav',
      },
      {
        title: 'Stock Check-out',
        path: '/stock-check-out',
        icon: <img className={'nav-icon'} src={Stocks} alt="stocks" />,
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
