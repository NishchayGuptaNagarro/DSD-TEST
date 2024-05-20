import {useState} from 'react';
import {Link} from 'react-router-dom';
import './Sidebar.scss';
import {useTranslation} from 'react-i18next';
import {SubMenuProps} from './propTypes/types.ts';

const SubMenu = ({item}: SubMenuProps) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  const {t} = useTranslation();

  return (
    <>
      <Link
        className={'sidebar-link'}
        to={item.path}
        onClick={item.subNav && showSubnav}>
        <span className={'sidebar-btn'}>
          {item.icon}
          <span className={'sidebar-label'}>{t(item.title)}</span>
        </span>
        <span className={'sidebar-arrow'}>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
              ? item.iconClosed
              : null}
        </span>
      </Link>
      {subnav &&
        item.subNav &&
        item.subNav.map((item, index) => {
          return (
            <Link className={'dropdown-link'} to={item.path} key={index}>
              {item.icon}
              <span className={'sidebar-label'}>{item.title}</span>
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu;
