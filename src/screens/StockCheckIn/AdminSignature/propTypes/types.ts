import {Dispatch, SetStateAction} from 'react';

export interface AdminSignatureProps {
  isSignatureDone: boolean;
  setIsSignatureDone: Dispatch<SetStateAction<boolean>>;
  signatureURL: string;
  setSignatureURL: Dispatch<SetStateAction<string>>;
}
