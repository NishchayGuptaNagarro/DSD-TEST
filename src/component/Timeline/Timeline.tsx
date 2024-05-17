import {useContext, useEffect} from 'react';
import timelineContext from 'context/timeline/timelineContext';
import {useTranslation} from 'react-i18next';
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
      <div className="container-timeline-outer">
        <div className="container-timeline">
          {steps?.map((step, i) => (
            //when the value of currentStep is equal to key+1 which is i+1 then it is our active div
            //when the value of currentStep is greater than key+1 then these are our completed div
            <div key={i} className={'step-item'}>
              {/* if currentStep is greater or equal to key+1 it means they are completed, and we have to show them as dark blue// */}
              <div className="step">
                {i + 1 <= currentStep ? (
                  <div className="steps-done"></div>
                ) : null}
              </div>
              {/* completed text will be shown as white and non completed as in faded white */}
              <p
                className={`${i + 1 <= currentStep ? 'active' : 'disable'}`}
                style={{textTransform: 'capitalize'}}>
                {` ${i + 1}.  ${t(step)}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Timeline;
