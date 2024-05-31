export interface SidebarOption {
  title: string;
  path: string;
  icon: JSX.Element;
  iconClosed?: JSX.Element;
  iconOpened?: JSX.Element;
  subNav?: SubOption[];
}

interface SubOption {
  title: string;
  path: string;
  icon: JSX.Element;
  cName: string;
}

export interface SubMenuProps {
  item: SidebarOption;
  subnav?: boolean;
  showSubnav?: () => void;
}
