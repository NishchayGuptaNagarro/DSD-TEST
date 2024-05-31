import timelineContext from 'context/timeline/timelineContext';

import {RenderOptions, render, screen} from '@testing-library/react';
import TimeLineContextProps from 'context/timeline/timelineProps/timeline.type';
import {Dispatch, SetStateAction} from 'react';
import Timeline from './Timeline';

const mockTimelineProps: TimeLineContextProps = {
  steps: ['Select Driver', 'Assigned Stock', 'Activation'],
  orderRoutes: [],
  currentStep: 2,
  setCurrentStep: jest.fn() as Dispatch<SetStateAction<number>>,
  increaseSteps: jest.fn(),
  decreaseSteps: jest.fn(),
  rememberSteps: jest.fn(),
  updateStepsArray: jest.fn(),
  updateOrderRoutes: jest.fn(),
};

interface ProviderProps {
  providerProps: TimeLineContextProps;
}

const renderWithContext = (
  ui: React.ReactElement,
  {providerProps, ...renderOptions}: ProviderProps & RenderOptions,
) => {
  return render(
    <timelineContext.Provider value={providerProps}>
      {ui}
    </timelineContext.Provider>,
    renderOptions,
  );
};

describe('timeline tets', () => {
  beforeEach(() => {
    renderWithContext(<Timeline />, {
      providerProps: mockTimelineProps,
    });
  });

  test('calls rememberStep function onMount', () => {
    expect(mockTimelineProps.rememberSteps).toHaveBeenCalledTimes(1);
  });

  test('render all timeline steps', () => {
    mockTimelineProps.steps.forEach((step, index) => {
      expect(screen.queryAllByText(` ${index + 1}.  ${step}`));
    });
  });

  test('steps marked as active or disabled', () => {
    expect(screen.getByText('1. Select Driver')).toHaveClass('active');
    expect(screen.getByText('2. Assigned Stock')).toHaveClass('active');
    expect(screen.getByText('3. Activation')).toHaveClass('disable');
  });

  test('checks if .steps-done is present in .step based on currentStep', () => {
    const {container} = renderWithContext(<Timeline />, {
      providerProps: mockTimelineProps,
    });
    const stepElements = container.querySelectorAll('step');

    stepElements.forEach((step, index) => {
      if (index + 1 <= mockTimelineProps.currentStep) {
        expect(step.querySelector('.steps-done')).toBeInTheDocument();
      } else {
        expect(step.querySelector('.steps-done')).not.toBeInTheDocument();
      }
    });
  });
});
