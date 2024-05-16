export interface SideBarOption {
  id: number;
  Option: string;
  icon: string;
  isOpen: boolean;
  path: string;
  submenu?: submenuList[];
}

export interface submenuList {
  submenuTitleLeft: string;
  submenuTitleRight: string;
  pathSubmenu: string;
}
