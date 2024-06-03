import {Link} from 'react-router-dom';
import './Sidebar.scss';
import {useTranslation} from 'react-i18next';
import {SubMenuProps} from './propTypes/types.ts';
import {ButtonBase} from '@mui/material';

function SubMenu({item, subnav, showSubnav}: SubMenuProps) {
  const {t} = useTranslation();

  return (
    <>
      {item.subNav ? (
        <ButtonBase
          sx={{
            textAlign: 'unset',
          }}
          className={'sidebar-link'}
          data-testid="subnav-present"
          onClick={showSubnav}>
          <span className={'sidebar-btn'}>
            {item.icon}
            <span className={'sidebar-label'}>{t(item.title)}</span>
          </span>
          <span className={'sidebar-arrow'}>
            {subnav ? item.iconOpened : item.iconClosed}
          </span>
        </ButtonBase>
      ) : (
        <Link
          className={'sidebar-link'}
          to={item.path}
          data-testid="subnav-absent"
          onClick={showSubnav}>
          <span className={'sidebar-btn'}>
            {item.icon}
            <span className={'sidebar-label'}>{t(item.title)}</span>
          </span>
        </Link>
      )}
      {subnav && item.subNav && (
        <div data-testid="sidebar-submenu-options">
          {item.subNav.map((subItem, subIndex) => (
            <Link className="dropdown-link" to={subItem.path} key={subIndex}>
              {subItem.icon}
              <span className="sidebar-label">{t(subItem.title)}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default SubMenu;
