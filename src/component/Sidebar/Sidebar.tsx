import {useState} from 'react';
import './Sidebar.scss';
import closed from '../../assets/PNG/Sample logox2_Closed.png';
import openImg from '../../assets/PNG/Sample logox2_Open.png';
import {MdOutlineKeyboardArrowDown} from 'react-icons/md';
import DashBoard from '../../assets/PNG/Dashboard.png';
import Stocks from '../../assets/PNG/Stocks.png';
import Orders from '../../assets/PNG/Orders.png';
import Signout from '../../assets/PNG/Sign Out.png';
import Settings from '../../assets/PNG/Settings.png';
import {SideBarOption} from './propTypes/SidebarRoutes';

import {MdOutlineKeyboardArrowUp} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

function Sidebar() {
  const {t} = useTranslation();
  const [showbar, setShowbBar] = useState<boolean>(true);
  const [navData, setNavData] = useState<SideBarOption[]>([
    {
      id: 1,
      Option: 'sidebar.dashboard',
      subOptionLeft: '',
      subOptionRight: '',
      icon: DashBoard,
      isOpen: false,
      path: '/',
    },
    {
      id: 2,
      Option: 'sidebar.stock',
      subOptionLeft: 'S',
      subOptionRight: 'My warehouse avalable stock',
      icon: Stocks,
      isOpen: false,
      path: '/breadcrump',
    },
    {
      id: 3,
      Option: 'sidebar.orders',
      subOptionLeft: 'M',
      subOptionRight: 'My warehouse assign orders',
      icon: Orders,
      isOpen: false,
      path: '/createloadingorder',
    },
  ]);

  const navigate = useNavigate();

  // const showSideBar = (): void => {
  //   setShowbBar(!showbar);
  //   console.log(showbar);
  // };

  const openSubmenu = (id: number): void => {
    console.log('reaching here');
    const result = navData.map((item: SideBarOption) => {
      if (item.id === id) {
        return {
          ...item,
          isOpen: !item.isOpen,
        };
      } else {
        return item;
      }
    });
    console.log(result);
    setNavData(result);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    console.log(path);
  };
  function handleSignOut() {
    localStorage.clear();
    navigate('/');
  }

  return (
    <>
      <div className={showbar ? 'nav-menu-active' : 'nav-menu-closed'}>
        {showbar ? (
          <>
            <div className="logo-open-container">
              <img
                src={openImg}
                className="open-logo-img"
                // onClick={showSideBar}
                alt="no-image-present"></img>
            </div>

            <nav className="option-navigate">
              {navData.map((item: SideBarOption, index: number) => (
                <div key={index}>
                  <div
                    className="options-container"
                    onClick={() => navigateTo(item.path)}>
                    <div className="options-left">
                      <img
                        src={item.icon}
                        alt="No-icon"
                        className="icon-img"></img>
                    </div>
                    <div className="options-right">
                      <div>
                        <p className="options-text cursor-pointer">
                          {t(item.Option)}
                        </p>
                      </div>
                      <div>
                        {item.isOpen ? (
                          <MdOutlineKeyboardArrowUp
                            className="arrow-nav"
                            onClick={() => openSubmenu(item.id)}
                          />
                        ) : (
                          <MdOutlineKeyboardArrowDown
                            className="arrow-nav"
                            onClick={() => openSubmenu(item.id)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {item.isOpen && item.id !== 1 && (
                    <div className="dropdown-menu">
                      <div className="submenu-left">
                        <p className="submenu-left-text">
                          {item.subOptionLeft}
                        </p>
                      </div>
                      <div className="submenu-right">
                        <p className="submenu-right-text">
                          {item.subOptionRight}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </>
        ) : (
          <>
            <div className="sidebar-logo">
              <img
                src={closed}
                alt="No image present"
                // onClick={showSideBar}
                className="img-closed"></img>
            </div>
            <div className="mid-icons">
              <nav className="nav-menu">
                <ul className="nav-menu-items">
                  {navData.map((item: SideBarOption, index: number) => (
                    <li className="nav-menu-list" key={index}>
                      <img
                        src={item.icon}
                        alt="no-image"
                        style={{height: '5vh', width: '2.5vw'}}></img>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </>
        )}

        {showbar ? (
          <div className="bottom-icons-open">
            <div className="bottom-icons-container">
              <img
                src={Signout}
                alt="alternate-image"
                style={{height: '4vh'}}
              />
              <p
                className="bottom-text cursor-pointer"
                role="button"
                onClick={handleSignOut}>
                {t('sidebar.signout')}
              </p>
            </div>

            <div className="bottom-icons-container">
              <img
                src={Settings}
                alt="alternate-image"
                style={{height: '4vh'}}
              />
              <p className="bottom-text cursor-pointer">
                {t('sidebar.settings')}
              </p>
            </div>
          </div>
        ) : (
          <div className="bottom-icons">
            <img
              src={Signout}
              alt="alternate-image"
              style={{height: '5vh', width: '2vw', marginTop: '20%'}}
            />

            <img
              src={Settings}
              alt="alternate-image"
              style={{height: '5vh', width: '2vw', marginTop: '40%'}}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
