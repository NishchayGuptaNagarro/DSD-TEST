import {SidebarData} from './SidebarData';
import SubMenu from './SubMenu.tsx';
import './Sidebar.scss';
import {Link, useNavigate} from 'react-router-dom';
import Signout from 'assets/PNG/Sign Out.png';
import Settings from 'assets/PNG/Settings.png';
import openImg from 'assets/PNG/Sample logox2_Open.png';
import {useTranslation} from 'react-i18next';

const Sidebar = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <nav className={'sidebar-nav'}>
        <div className={'logo-div'}>
          <img src={openImg} className="logo-img" alt="no-image-present"></img>
        </div>
        {SidebarData.map((item, index) => {
          return <SubMenu item={item} key={index} />;
        })}
        <div className={'sidebar-bottom'}>
          <Link
            className={'sidebar-link sidebar-important'}
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
