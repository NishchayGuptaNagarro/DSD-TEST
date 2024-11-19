import CheckIn from 'assets/SVG/CheckIn.svg';
import CheckInNavyBlue from 'assets/SVG/CheckInNavyBlue.svg';
import CheckInSkyBlue from 'assets/SVG/CheckInSkyBlue.svg';
import CheckOut from 'assets/SVG/CheckOut.svg';
import CheckOutNavyBlue from 'assets/SVG/CheckOutNavyBlue.svg';
import CheckOutSkyBlue from 'assets/SVG/CheckOutSkyBlue.svg';
import History from 'assets/SVG/History.svg';
import HistoryNavyBlue from 'assets/SVG/HistoryNavyBlue.svg';
import HistorySkyBlue from 'assets/SVG/HistorySkyBlue.svg';
import Home from 'assets/SVG/Home.svg';
import HomeSkyBlue from 'assets/SVG/HomeSkyBlue.svg';
import {SidebarOption} from './propTypes/types.ts';

export const SidebarData: SidebarOption[] = [
  {
    id: 1,
    title: 'sidebar.home',
    cardTitle: '',
    path: '/home',
    icon: <img className={'nav-icon'} src={Home} alt="home" />,
    iconSkyBlue: <img className={'nav-icon'} src={HomeSkyBlue} alt="home" />,
    iconNavyBlue: <img className={'nav-icon'} src={Home} alt="home" />,
    secondaryInfo: 'home.secondaryInfo',
  },
  {
    id: 2,
    title: 'stockcheckout.heading',
    cardTitle: 'stockcheckout.cardTitle',
    path: '/stock-check-out',
    icon: <img className={'nav-icon'} src={CheckOut} alt="stock check out" />,
    iconSkyBlue: (
      <img className={'nav-icon'} src={CheckOutSkyBlue} alt="home" />
    ),
    iconNavyBlue: (
      <img className={'nav-icon'} src={CheckOutNavyBlue} alt="home" />
    ),
    secondaryInfo: 'stockcheckout.secondaryInfo',
  },
  {
    id: 3,
    title: 'stockcheckin.heading',
    cardTitle: 'stockcheckin.cardTitle',
    path: '/stock-check-in',
    icon: <img className={'nav-icon'} src={CheckIn} alt="stock check in" />,
    iconSkyBlue: <img className={'nav-icon'} src={CheckInSkyBlue} alt="home" />,
    iconNavyBlue: (
      <img className={'nav-icon'} src={CheckInNavyBlue} alt="home" />
    ),
    secondaryInfo: 'stockcheckin.secondaryInfo',
  },
  {
    id: 4,
    title: 'sidebar.history',
    cardTitle: 'sidebar.history',
    path: '/history',
    icon: <img className={'nav-icon'} src={History} alt={'history'} />,
    iconSkyBlue: <img className={'nav-icon'} src={HistorySkyBlue} alt="home" />,
    iconNavyBlue: (
      <img className={'nav-icon'} src={HistoryNavyBlue} alt="home" />
    ),
    secondaryInfo: 'history.secondaryInfo',
  },
];

