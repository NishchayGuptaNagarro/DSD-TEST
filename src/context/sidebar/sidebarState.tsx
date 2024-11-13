import {ReactNode, useState} from 'react';
import SidebarContext from './sidebarContext';

type UserProvidedProps = {
  children: ReactNode;
};

function SidebarState({children}: UserProvidedProps) {
  const [currentNav, setCurrentNav] = useState<number>(1);

  const updateCurrentNav = (selectedNav: number) => {
    sessionStorage.setItem('currentNav', JSON.stringify(selectedNav));
    setCurrentNav(selectedNav);
  };

  // Remember Steps Function:
  // This function retrieves the current step value from local storage when the component mounts.
  // If no value is found in local storage, it defaults to 1.
  const rememberNav = () => {
    // Retrieve the current step value from local storage or default to 1
    const currentNavs = JSON.parse(sessionStorage.getItem('currentNav') || '1');
    if (currentNavs) {
      setCurrentNav(currentNavs);
    }
  };

  return (
    <SidebarContext.Provider
      value={{
        currentNav,
        updateCurrentNav,
        rememberNav,
      }}>
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarState;
