import {Dispatch, SetStateAction} from 'react';

interface TimeLineContextProps {
  steps: string[];
  orderRoutes: string[];
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  increaseSteps: () => void;
  decreaseSteps: () => void;
  rememberSteps: () => void;
}

export default TimeLineContextProps;
