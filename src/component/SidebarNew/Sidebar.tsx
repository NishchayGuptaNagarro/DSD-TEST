import {SidebarData} from './SidebarData';
import SubMenu from './SubMenu.tsx';
import './Sidebar.scss';
import {Link, useNavigate} from 'react-router-dom';
import Signout from 'assets/PNG/Sign Out.png';
import Settings from 'assets/PNG/Settings.png';
import logo from 'assets/SVG/NotionEdgeWhite.svg';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';

const Sidebar = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  const clearStorage = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <nav data-testid={'sidebar'} className={'sidebar-nav'}>
        <div className={'logo-div'}>
          <img src={logo} className="logo-img" alt="no-image-present"></img>
        </div>
        <hr className={'sidebar-division'} />

        <ul>
          {SidebarData.map((item, index) => {
            return (
              <li key={index}>
                <SubMenu
                  item={item}
                  key={index}
                  subnav={subnav}
                  showSubnav={showSubnav}
                />
              </li>
            );
          })}
        </ul>

        <div className={'sidebar-bottom'}>
          <Link
            className={'sidebar-link '}
            data-testid="signout-id"
            to=""
            onClick={clearStorage}>
            <span className={'sidebar-btn '}>
              <img className={'nav-icon'} src={Signout} alt={'signout'} />
              <span className={'sidebar-label sidebar-important'}>
                {t('sidebar.signout')}
              </span>
            </span>
          </Link>
          <Link
            className={'sidebar-link'}
            to="/settings"
            data-testid="settings-id">
            <span className={'sidebar-btn '}>
              <img className={'nav-icon'} src={Settings} alt={'settings'} />
              <span className={'sidebar-label  sidebar-important '}>
                {t('sidebar.settings')}
              </span>
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
