import logo from 'assets/SVG/NagarroWhite.svg';
import sidebarContext from 'context/sidebar/sidebarContext.ts';
import {useContext, useEffect} from 'react';
import './Sidebar.scss';
import {SidebarData} from './SidebarData';
import SubMenu from './SubMenu.tsx';

function Sidebar() {
  const {currentNav, updateCurrentNav, rememberNav} =
    useContext(sidebarContext);
  //When someone refresh the page this method will get called//
  useEffect(() => {
    rememberNav();
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
                  selected={false}
                  item={item}
                  selectedNav={currentNav}
                  handleSelectedNav={handleSelectedNav}></SubMenu>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;

