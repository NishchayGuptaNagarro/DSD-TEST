import {Drivers} from 'models/Driver.ts';
import {driverTypes} from 'models/driverTypes.ts';
import {useState} from 'react';
import getInitialDriverType from 'utilities/getInitialDriverType.ts';
import {StockCheckInStates} from './propTypes/types.ts';

export function useStockCheckInState(): StockCheckInStates {
  const [driverArray, setDriverArray] = useState<Drivers>({
    'VAN-SELLER': [],
    DELIVERY: [],
    HYBRID: [],
  });

  const [driverType, setDriverType] = useState<driverTypes>(
    getInitialDriverType(),
  );
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

