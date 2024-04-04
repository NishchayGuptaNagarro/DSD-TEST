import {Dispatch, SetStateAction} from 'react';

interface TimeLineContextProps {
  steps: string[];
  orderRoutes: string[];
  currentStep: number;
  complete: boolean;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  setComplete: Dispatch<SetStateAction<boolean>>;
  stepsComplete: () => void;
  increaseSteps: () => void;
  decreaseSteps: () => void;
  rememberSteps: () => void;
}

export default TimeLineContextProps;
