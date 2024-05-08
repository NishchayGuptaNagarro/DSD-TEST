//Interfaces for API response
import {Dispatch, SetStateAction} from 'react';

interface ApiSignature {
  signature_id: number;
  manager_id: number | null;
  checkout_time: string;
  checking_status: string;
  manager_signature_image: string | null;
  updated_at: string;
  order_loading_id: number | null;
  driver_id: string;
  checkin_time: string | null;
  driver_signature_image: string;
  creation_date: string;
}

export interface SignatureApiResponse {
  status_code: number;
  data: ApiSignature;
}

export interface DriverSignatureProps {
  isSignatureLoaded: boolean;
  setIsSignatureLoaded: Dispatch<SetStateAction<boolean>>;
}
