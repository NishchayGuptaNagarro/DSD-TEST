// Props for dropdown button
export interface DropDownButtonProps {
  options: string[];
  handleClick: (selectedIndex: number) => void; //this function will be called when an option is clicked
}
