interface SideBarContextProps {
  currentNav: number;
  updateCurrentNav: (id: number) => void;
  rememberNav: () => void;
}

export default SideBarContextProps;
