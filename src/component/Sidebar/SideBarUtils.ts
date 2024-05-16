import {SideBarOption} from './propTypes/SidebarRoutes';
import {NavigateFunction} from 'react-router-dom';

export const openSubmenu = (
  index: number,
  navData: SideBarOption[],
  setNavData: any,
): void => {
  
  const alterSubmenu = [...navData];
  alterSubmenu[index] = {
    ...alterSubmenu[index],
    isOpen: !alterSubmenu[index].isOpen,
  };
  setNavData(alterSubmenu);
};

export const navigateTo = (path: string, navigate: NavigateFunction) => {
  navigate(path);
};

export function handleSignOut(
  functionName: string,
  navigate: NavigateFunction,
): void {
  if (functionName === 'Signout') {
    localStorage.clear();
    navigate('/');
  }
}
