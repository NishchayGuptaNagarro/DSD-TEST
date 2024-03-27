import {Driver} from '../../../screens/SelectDriver/propTypes/types.ts';

export interface DriverCardProps {
  driver: Driver;
  selected: boolean;
  handleSelected: () => void;
}
