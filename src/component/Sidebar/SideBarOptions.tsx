import React from 'react';
import {SideBarOption, submenuList} from './propTypes/SidebarRoutes';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import {navigateTo} from './SideBarUtils';

interface SideBarOptionsProp {
  item: SideBarOption;
  openSubmenu: (
    index: number,
    navData: SideBarOption[],
    setNavData: any,
  ) => void;
  index: number;
  t: (key: string) => string;
  navData: SideBarOption[];
  setNavData: React.Dispatch<React.SetStateAction<SideBarOption[]>>;
}

const SideBarOptions: React.FC<SideBarOptionsProp> = ({
  item,
  openSubmenu,
  index,
  t,
  navData,
  setNavData,
}) => {
  const navigate: NavigateFunction = useNavigate();
  const dropdownMenu = (submenu: submenuList[] | undefined) => {
    return (
      <div className="dropdown-menu">
        {submenu?.map((item: submenuList, index: number) => (
          <div
            key={index}
            className="submenu"
            role="button"
            onClick={() => navigateTo(item.pathSubmenu, navigate)}>
            <div className="submenu-right">
              <p className="submenu-right-text">{item.submenuTitleLeft}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div key={index}>
        <div
          className="options-container"
          role="button"
          onClick={() => item.id !== 2 && navigateTo(item.path, navigate)}>
          <div className="options-left">
            <img src={item.icon} alt="No-icon" className="icon-img"></img>
          </div>
          <div className="options-right">
            <div>
              <p className="options-text cursor-pointer">{t(item.Option)}</p>
            </div>
            {item.id !== 1 && item.id !== 3 && (
              <div>
                {item.isOpen ? (
                  <MdOutlineKeyboardArrowUp
                    className="arrow-nav"
                    onClick={() => openSubmenu(index, navData, setNavData)}
                  />
                ) : (
                  <MdOutlineKeyboardArrowDown
                    className="arrow-nav"
                    onClick={() => openSubmenu(index, navData, setNavData)}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {item.isOpen && dropdownMenu(item.submenu)}
      </div>
    </>
  );
};

export default SideBarOptions;
