import {ReactNode, useState} from 'react';
import TimelineContext from './timelineContext';
import {vanSellerSteps} from 'utilities/timelineSteps.ts';
import {vanSellerRoutes} from 'utilities/timelineRoutes.ts';

type UserProvidedProps = {
  children: ReactNode;
};

function TimelineState({children}: UserProvidedProps) {
  const [steps, setSteps] = useState<string[]>(vanSellerSteps);

  const [orderRoutes, setOrderRoutes] = useState<string[]>(vanSellerRoutes);

  const [currentStep, setCurrentStep] = useState<number>(1);

  function updateStepsArray(steps: string[]) {
    setSteps(steps);
  }
  function updateOrderRoutes(routes: string[]) {
    setOrderRoutes(routes);
  }

  //updateSteps will take the value and update the currentStep
  const updateSteps = (stepVal: number) => {
    setCurrentStep(prevStep => {
      const updatedStep = prevStep + stepVal;

      //if updatedStep is greater or equal to 1 and lesser than or equal to steps length we will update it if the condition fails then it will remain same//
      const step =
        updatedStep >= 1 && updatedStep <= steps.length
          ? updatedStep
          : prevStep;
      sessionStorage.setItem('currentStep', JSON.stringify(step));
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
    const currentSteps = JSON.parse(
      sessionStorage.getItem('currentStep') || '1',
    );
    if (currentSteps) {
      setCurrentStep(currentSteps);
    }
  };

  return (
    <TimelineContext.Provider
      value={{
        steps,
        currentStep,
        setCurrentStep,
        increaseSteps,
        decreaseSteps,
        rememberSteps,
        orderRoutes,
        updateStepsArray,
        updateOrderRoutes,
      }}>
      {children}
    </TimelineContext.Provider>
  );
}

export default TimelineState;
