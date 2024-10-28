import InProgressStep from 'assets/PNG/InProgressStep.png';
import CompletedStep from 'assets/SVG/CompletedStep.svg';
import PendingStep from 'assets/SVG/PendingStep.svg';
import timelineContext from 'context/timeline/timelineContext';
import {useContext, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';

import './Timeline.scss';

function Timeline() {
  const {t} = useTranslation();
  const {currentStep, steps, rememberSteps} = useContext(timelineContext);

  //When someone refresh the page this method will get called//
  useEffect(() => {
    rememberSteps();
  }, []);

  return (
    <>
      <div data-testid={'timeline'} className="container-timeline-outer">
        <div className="container-timeline">
          {steps?.map((step, i) => (
            //when the value of currentStep is equal to key+1 which is i+1 then it is our active div
            //when the value of currentStep is greater than key+1 then these are our completed div
            <div className="timeline_indicator" key={i}>
              <div className={'step-item'}>
                {/* if currentStep is greater or equal to key+1 it means they are completed, and we have to show them as dark blue// */}
                <div data-testid="step" className="step">
                  <div className="steps-done">
                    {i + 1 < currentStep ? (
                      <img src={CompletedStep} alt="Step Completed" />
                    ) : i + 1 === currentStep ? (
                      <img src={InProgressStep} alt="Current Step" />
                    ) : (
                      <img src={PendingStep} alt="Upcoming Step" />
                    )}
                  </div>
                </div>

                {/* completed text will be shown as white and non completed as in faded white */}
                <div
                  className={
                    i + 1 < currentStep
                      ? 'completed'
                      : i + 1 === currentStep
                        ? 'in-progress'
                        : 'pending'
                  }
                  style={{textTransform: 'capitalize'}}>
                  <p className="steps">{` ${i + 1}.  ${t(step)}`}</p>
                  <span style={{display: 'flex', justifyContent: 'center'}}>
                    {i + 1 < currentStep
                      ? 'Completed'
                      : i + 1 === currentStep
                        ? 'In Progress'
                        : 'Pending'}
                  </span>
                </div>
              </div>
              {i + 1 < steps.length && (
                <div className="step-indicator">
                  <hr
                    className="timeline-hr"
                    style={{
                      backgroundColor:
                        i + 1 < currentStep
                          ? styles.bgFreshGreen
                          : styles.bgSoftSky,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Timeline;

