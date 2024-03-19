import {ReactElement} from 'react';

// Interface defining Details Card Component Props
export interface DetailsCardProps {
  heading: string;
  icon: ReactElement<SVGSVGElement>;
  mainInfo: string;
  secondaryInfo: string;
}
