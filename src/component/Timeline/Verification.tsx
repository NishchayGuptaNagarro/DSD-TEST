import {useContext} from 'react';
import timelineContext from '../../context/timeline/timelineContext';

const Verification = () => {
  const {currentStep, decreaseSteps, stepsComplete, steps, increaseSteps} =
    useContext(timelineContext) || {};
  return (
    <>
      <div>Verification</div>
      <div className="buttons-group">
        <button
          className="btn-item"
          onClick={() => {
            currentStep > 1 ? decreaseSteps() : stepsComplete();
          }}
          disabled={currentStep === 1}>
          Back
        </button>

        <button
          className="btn-item"
          onClick={() => {
            currentStep === steps.length ? stepsComplete() : increaseSteps();
          }}>
          {currentStep === steps.length ? 'Finish' : 'Next'}
        </button>
      </div>
    </>
  );
};

export default Verification;
