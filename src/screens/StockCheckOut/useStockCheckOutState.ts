import {SelectDriverStates} from './propTypes/types.ts';
import {useState} from 'react';
import {Driver} from 'models/driver.ts';
import {Row} from 'component/Table/propTypes/types.ts';

export function useStockCheckOutState(): SelectDriverStates {
  const [driverArray, setDriverArray] = useState<Driver[]>([]);
  function loadInitialType() {
    const initialType = localStorage.getItem('selected_type');
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
  const [selectedDriver, setSelectedDriver] = useState<string>(
    localStorage.getItem('selected_driver') || '',
  );
  const [isDriverGridLoading, setIsDriverGridLoading] = useState(true);
  const [isTableLoaded, setIsTableLoaded] = useState(false);
  const [isSignatureLoaded, setIsSignatureLoaded] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(true);
  return {
    driverArray,
    setDriverArray,
    selectedDriver,
    alertOpen,
    alertText,
    rows,
    setRows,
    setSelectedDriver,
    isSignatureLoaded,
    isTableLoaded,
    setIsTableLoaded,
    setAlertOpen,
    setAlertText,
    setIsDriverGridLoading,
    setIsSignatureLoaded,
    isDriverGridLoading,
    nextDisabled,
    setNextDisabled,
    setDriverType,
    driverType,
  };
}
