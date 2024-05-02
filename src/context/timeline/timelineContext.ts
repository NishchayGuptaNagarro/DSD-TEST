import {createContext} from 'react';
import TimeLineContextProps from './timelineProps/timeline.type';

//create context is a generic function which we are calling//
const timelineContext = createContext<TimeLineContextProps>({
  steps: [],
  currentStep: 1,
  setCurrentStep: () => {},
  increaseSteps: () => {},
  decreaseSteps: () => {},
  rememberSteps: () => {},
  orderRoutes: [],
  updateOrderRoutes: () => {},
  updateStepsArray: () => {},
});

export default timelineContext;
