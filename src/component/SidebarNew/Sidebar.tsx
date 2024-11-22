import logo from 'assets/SVG/NagarroWhite.svg';
import sidebarContext from 'context/sidebar/sidebarContext.ts';
import {useContext, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import './Sidebar.scss';
import {SidebarData} from './SidebarData';
import SubMenu from './SubMenu';

function Sidebar() {
  const location = useLocation();
  const {currentNav, updateCurrentNav} = useContext(sidebarContext);
  //When someone refresh the page this method will get called//
  useEffect(() => {
    const currentSidebarItem = SidebarData.find(item =>
      location.pathname.startsWith(item.path),
    );
    updateCurrentNav(currentSidebarItem ? currentSidebarItem.id : 1);
  }, []);

  const handleSelectedNav = (id: number) => {
    updateCurrentNav(id);
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
                  key={index}
                  item={item}
                  selectedNav={currentNav}
                  handleSelectedNav={handleSelectedNav}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;

