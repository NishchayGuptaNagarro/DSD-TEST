import {SidebarData} from './SidebarData';
import SubMenu from './SubMenu.tsx';
import './Sidebar.scss';
import {Link, useNavigate} from 'react-router-dom';
import Signout from 'assets/PNG/Sign Out.png';
import Settings from 'assets/PNG/Settings.png';
import logo from 'assets/SVG/NagarroDark.svg';
import {useTranslation} from 'react-i18next';

const Sidebar = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <nav className={'sidebar-nav'}>
        <div className={'logo-div'}>
          <img src={logo} className="logo-img" alt="no-image-present"></img>
        </div>
        <hr className={'sidebar-division'} />
        {SidebarData.map((item, index) => {
          return <SubMenu item={item} key={index} />;
        })}
        <div className={'sidebar-bottom'}>
          <Link
            className={'sidebar-link '}
            to=""
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }}>
            <span className={'sidebar-btn '}>
              <img className={'nav-icon'} src={Signout} alt={'signout'} />
              <span className={'sidebar-label sidebar-important'}>
                {t('sidebar.signout')}
              </span>
            </span>
          </Link>
          <Link className={'sidebar-link '} to="/settings">
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
