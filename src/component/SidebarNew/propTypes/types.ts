export interface SidebarOption {
  title: string;
  path: string;
  icon: JSX.Element;
  id: number;
}
export interface SubMenuProps {
  item: SidebarOption;
  selectedNav: number;
  handleSelectedNav: (id: number) => void;
}

