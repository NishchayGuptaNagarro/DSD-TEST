import {StockCheckInStates} from './propTypes/types.ts';
import {useState} from 'react';
import {Driver} from 'models/driver.ts';

export function useStockCheckInState(): StockCheckInStates {
  const [driverArray, setDriverArray] = useState<Driver[]>([]);
  function loadInitialType() {
    const initialType = localStorage.getItem('selected_driver_type');
    if (
      initialType == 'VAN-SELLER' ||
      initialType == 'DELIVERY' ||
      initialType == 'HYBRID'
    ) {
      return initialType;
    } else {
      return 'VAN-SELLER';
    }
  }
  const [driverType, setDriverType] = useState<
    'VAN-SELLER' | 'DELIVERY' | 'HYBRID'
  >(loadInitialType());
  const [selectedDriver, setSelectedDriver] = useState<string>('');
  const [isDriverGridLoading, setIsDriverGridLoading] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [isSignatureDone, setIsSignatureDone] = useState(false);
  const [signatureURL, setSignatureURL] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  return {
    driverArray,
    setDriverArray,
    selectedDriver,
    isDriverGridLoading,
    driverType,
    setDriverType,
    setSelectedDriver,
    setIsDriverGridLoading,
    nextDisabled,
    setNextDisabled,
    isSignatureDone,
    setIsSignatureDone,
    setSignatureURL,
    signatureURL,
    alertOpen,
    setAlertOpen,
  };
}
