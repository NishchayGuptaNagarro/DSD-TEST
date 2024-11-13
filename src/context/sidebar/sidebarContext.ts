import {createContext} from 'react';
import SideBarContextProps from './sidebarProps/sidebar.types';

//create context is a generic function which we are calling//
const sidebarContext = createContext<SideBarContextProps>({
  currentNav: 1,
  updateCurrentNav: () => {},
  rememberNav: () => {},
});

export default sidebarContext;
