export interface SidebarOption {
  title: string;
  cardTitle: string;
  path: string;
  icon: JSX.Element;
  iconSkyBlue: JSX.Element;
  iconNavyBlue: JSX.Element;
  id: number;
  secondaryInfo: string;
}
export interface SubMenuProps {
  item: SidebarOption;
  selectedNav: number;
  handleSelectedNav: (id: number) => void;
}

