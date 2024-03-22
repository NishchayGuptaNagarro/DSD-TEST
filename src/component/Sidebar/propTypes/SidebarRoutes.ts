export interface SideBarOption {
  id: number;
  Option: string;
  subOptionLeft?: string;
  subOptionRight?: string;
  icon: string;
  isOpen: boolean;
  path: string;
}
