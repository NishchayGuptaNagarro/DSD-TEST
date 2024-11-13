interface SideBarContextProps {
  currentNav: number;
  updateCurrentNav: (selectedNav: number) => void;
  rememberNav: () => void;
}

export default SideBarContextProps;
