import React, {ReactNode, useState} from 'react';
import TimelineContext from './timelineContext';

type UserProvidedProps = {
  children: ReactNode;
};

const TimeLineState: React.FC<UserProvidedProps> = ({children}) => {
  const steps: string[] = [
    'Select Driver',
    'Verification/Validation',
    'Activation',
  ];
  const orderRoutes: string[] = ['driver', 'order', 'signature'];
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [complete, setComplete] = useState<boolean>(false);

  const stepsComplete = () => {
    console.log('reaching');
    setComplete(!complete);
  };

  //updateSteps will take the value and update the currentStep
  const updateSteps = (stepVal: number) => {
    setCurrentStep(prevStep => {
      const updatedStep = prevStep + stepVal;

      //if updatedStep is greater or equal to 1 and lesser than or equal to steps length we will update it if the condition fails then it will remain same//
      const step =
        updatedStep >= 1 && updatedStep <= steps.length
          ? updatedStep
          : prevStep;
      localStorage.setItem('currentStep', JSON.stringify(step));
      return step;
    });
  };

  //to increase the steps//
  const increaseSteps = () => {
    updateSteps(1);
  };

  //to decrease the steps//
  const decreaseSteps = () => {
    updateSteps(-1);
  };

  // Remember Steps Function:
  // This function retrieves the current step value from local storage when the component mounts.
  // If no value is found in local storage, it defaults to 1.
  const rememberSteps = () => {
    // Retrieve the current step value from local storage or default to 1
    const currentSteps = JSON.parse(localStorage.getItem('currentStep') || '1');
    if (currentSteps) {
      setCurrentStep(currentSteps);
      console.log(currentStep);
    }
  };

  return (
    <TimelineContext.Provider
      value={{
        steps,
        currentStep,
        setCurrentStep,
        complete,
        setComplete,
        stepsComplete,
        increaseSteps,
        decreaseSteps,
        rememberSteps,
        orderRoutes,
      }}>
      {children}
    </TimelineContext.Provider>
  );
};

export default TimeLineState;
