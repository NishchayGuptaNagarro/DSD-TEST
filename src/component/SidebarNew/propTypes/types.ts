import {ReactNode} from 'react';

export interface SidebarOption {
  title: string;
  cardTitle: string;
  path: string;
  icon: ReactNode;
  iconSkyBlue: ReactNode;
  iconNavyBlue: ReactNode;
  id: number;
  secondaryInfo: string;
}
export interface SubMenuProps {
  item: SidebarOption;
  selectedNav: number;
  handleSelectedNav: (id: number) => void;
}

