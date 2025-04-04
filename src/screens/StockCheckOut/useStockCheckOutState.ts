import {useState} from 'react';
import {SelectDriverStates} from './propTypes/types.ts';
import {Drivers} from 'models/Driver.ts';
import {Row} from 'component/Table/propTypes/types.ts';

export function useStockCheckOutState(): SelectDriverStates {
  const [driverArray, setDriverArray] = useState<Drivers>({
    'VAN-SELLER': [],
    'DELIVERY': [],
    'HYBRID': [],
  });
  function loadInitialType() {
    const initialType = sessionStorage.getItem('selected_driver_type');
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

  const [rows, setRows] = useState<Row[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<string>('');
  const [isDriverGridLoading, setIsDriverGridLoading] = useState(true);
  const [isSignatureLoaded, setIsSignatureLoaded] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(true);
  return {
    driverArray,
    setDriverArray,
    selectedDriver,
    alertOpen,
    rows,
    setRows,
    setSelectedDriver,
    isSignatureLoaded,
    setAlertOpen,
    setIsDriverGridLoading,
    setIsSignatureLoaded,
    isDriverGridLoading,
    nextDisabled,
    setNextDisabled,
    setDriverType,
    driverType,
  };
}
