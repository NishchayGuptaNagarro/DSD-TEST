import {useState} from 'react';
import './Sidebar.scss';
import closed from 'assets/PNG/Sample logox2_Closed.png';
import openImg from 'assets/PNG/Sample logox2_Open.png';
import DashBoard from 'assets/PNG/Dashboard.png';
import Stocks from 'assets/PNG/Stocks.png';
import Orders from 'assets/PNG/Orders.png';
import Signout from 'assets/PNG/Sign Out.png';
import Settings from 'assets/PNG/Settings.png';
import {SideBarOption} from './propTypes/SidebarRoutes';
import {useTranslation} from 'react-i18next';
import SideBarOptions from './SideBarOptions';
import {openSubmenu} from './SideBarUtils';
import SidebarBottom from './SidebarBottom';

function Sidebar() {
  const {t} = useTranslation();
  const [showbar] = useState<boolean>(true);
  const [navData, setNavData] = useState<SideBarOption[]>([
    {
      id: 1,
      Option: 'sidebar.home',
      icon: DashBoard,
      isOpen: false,
      path: '/home',
    },
    {
      id: 2,
      Option: 'sidebar.stock',
      icon: Stocks,
      isOpen: false,
      path: '',
      submenu: [
        {
          submenuTitleLeft: 'Stock Check-In',
          submenuTitleRight: 'Stock Check-In',
          pathSubmenu: '/stock-check-in',
        },
        {
          submenuTitleLeft: 'Stock Check-Out',
          submenuTitleRight: 'Stock Check-Out',
          pathSubmenu: '/stock-check-out',
        },
      ],
    },
    {
      id: 3,
      Option: 'sidebar.history',
      icon: Orders,
      isOpen: false,
      path: '/history',
    },
  ]);

  return (
    <>
      <div className={showbar ? 'nav-menu-active' : 'nav-menu-closed'}>
        {showbar ? (
          <>
            <div className="logo-open-container">
              <img
                src={openImg}
                className="open-logo-img"
                alt="no-image-present"></img>
            </div>

            <nav className="option-navigate">
              {navData.map((item: SideBarOption, index: number) => (
                <SideBarOptions
                  key={index}
                  item={item}
                  index={index}
                  openSubmenu={openSubmenu}
                  t={t}
                  navData={navData}
                  setNavData={setNavData}
                />
              ))}
            </nav>
          </>
        ) : (
          <>
            <div className="sidebar-logo">
              <img
                src={closed}
                alt="No image present"
                className="img-closed"></img>
            </div>
            <div className="mid-icons">
              <nav className="nav-menu">
                <ul className="nav-menu-items">
                  {navData.map((item: SideBarOption, index: number) => (
                    <li className="nav-menu-list" key={index}>
                      <img src={item.icon} alt="no-image"></img>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </>
        )}

        {showbar ? (
          <div className="bottom-icons-open">
            <SidebarBottom
              icon={Signout}
              t={t}
              text={'sidebar.signout'}
              functionName="Signout"
            />
            <SidebarBottom
              icon={Settings}
              t={t}
              text={'sidebar.settings'}
              functionName="Settings"
            />
          </div>
        ) : (
          <div className="bottom-icons">
            <img src={Signout} alt="alternate-image" />
            <img src={Settings} alt="alternate-image" />
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
