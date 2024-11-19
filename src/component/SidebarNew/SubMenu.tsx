import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {SubMenuProps} from './propTypes/types.ts';
import './Sidebar.scss';

function SubMenu({item, selectedNav, handleSelectedNav}: SubMenuProps) {
  const {t} = useTranslation();
  return (
    <div key={item.id} onClick={() => handleSelectedNav(item.id)}>
      <Link
        className={`sidebar-link ${item.id === selectedNav ? 'selected-nav' : ''}`}
        to={item.path}
        data-testid="subnav-absent">
        <div
          className={`${item.id === selectedNav ? 'active-sidebar-vr' : 'inactive-sidebar-vr'}`}></div>
        <span className={'sidebar-btn'}>
          <span className={'sidebar-icon'}>
            {item.id === selectedNav ? item.iconSkyBlue : item.icon}
          </span>
          <span className={'sidebar-label'}>{t(item.title)}</span>
        </span>
      </Link>
    </div>
  );
}

export default SubMenu;

