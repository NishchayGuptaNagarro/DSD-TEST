import React, {useState, useContext, useEffect} from 'react';
import timelineContext from '../../context/timeline/timelineContext';
import './Timeline.scss';
import {Outlet, useNavigate} from 'react-router';

interface TimeLineProp {
  stepsTimeline?: string[];
}

const Timeline: React.FC<TimeLineProp> = () => {
  const {currentStep, steps, complete, rememberSteps} =
    useContext(timelineContext) || {};

  //When someone refresh the page this method will get called//
  useEffect(() => {
    rememberSteps();
  }, []);

  //whenever the value of currentStep will alter itself it will navigate accordingly//

  //function to transform the first letter to capital//
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <div className="container">
        <div className="container-timeline">
          {steps?.map((step, i) => (
            //when the value of currentStep is equal to key+1 which is i+1 then it is our active div
            //when the value of currentStep is greater than key+1 then these are our completed div
            <div
              key={i}
              className={`step-item ${currentStep === i + 1 && 'active'} ${
                (i + 1 < currentStep || complete) && 'complete'
              } `}>
              {/* if currentStep is greater or equal to key+1 it means they are completed and we have to show them as dark blue// */}
              <div className="step">
                {i + 1 <= currentStep || complete ? (
                  <div className="steps-done"></div>
                ) : null}
              </div>
              {/* completed text will be shown as white and non completed as in faded white */}
              <p
                className={`${i + 1 <= currentStep ? 'active' : 'disable'}`}
                style={{paddingTop: '0.5rem'}}>
                {` ${i + 1}.  ${capitalizeFirstLetter(step)}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Timeline;
