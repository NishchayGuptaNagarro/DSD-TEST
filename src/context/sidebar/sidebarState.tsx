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

  return (
    <SidebarContext.Provider
      value={{
        currentNav,
        updateCurrentNav,
      }}>
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarState;
