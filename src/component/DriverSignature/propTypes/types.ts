//Interfaces for API response
import {Dispatch, SetStateAction} from 'react';

interface ApiSignature {
  signature_image: string;
  signature_id: number;
  creation_date: string;
  updated_at: string;
  user_id: string;
  order_loading_id: string | null;
  signature_date: string;
}

export interface SignatureApiResponse {
  status_code: number;
  data: ApiSignature;
}

export interface DriverSignatureProps {
  isSignatureLoaded: boolean;
  setIsSignatureLoaded: Dispatch<SetStateAction<boolean>>;
}
