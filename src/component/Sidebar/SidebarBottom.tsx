import React from 'react';
import {useNavigate} from 'react-router-dom';
import {handleSignOut} from './SideBarUtils';

export interface BottomOptionsProp {
  icon: string;
  text: string;
  t: (key: string) => string;
  functionName: string;
}

const SidebarBottom: React.FC<BottomOptionsProp> = ({
  icon,
  text,
  t,
  functionName,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bottom-icons-container">
        <img src={icon} alt="alternate-image" style={{height: '25px'}} />
        <p
          className="bottom-text cursor-pointer"
          role="button"
          onClick={() => handleSignOut(functionName, navigate)}>
          {t(text)}
        </p>
      </div>
    </>
  );
};

export default SidebarBottom;
