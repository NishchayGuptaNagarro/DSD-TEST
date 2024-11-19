import CheckIn from 'assets/SVG/CheckIn.svg';
import CheckOut from 'assets/SVG/CheckOut.svg';
import History from 'assets/SVG/History.svg';
import Home from 'assets/SVG/Home.svg';
import {SidebarOption} from './propTypes/types.ts';

export const SidebarData: SidebarOption[] = [
  {
    id: 1,
    title: 'sidebar.home',
    path: '/home',
    icon: <img className={'nav-icon'} src={Home} alt="home" />,
  },
  {
    id: 2,
    title: 'stockcheckout.heading',
    path: '/stock-check-out',
    icon: <img className={'nav-icon'} src={CheckOut} alt="stock check out" />,
  },
  {
    id: 3,
    title: 'stockcheckin.heading',
    path: '/stock-check-in',
    icon: <img className={'nav-icon'} src={CheckIn} alt="stock check in" />,
  },
  {
    id: 4,
    title: 'sidebar.history',
    path: '/history',
    icon: <img className={'nav-icon'} src={History} alt={'history'} />,
  },
];

