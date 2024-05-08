import {StockCheckInStates} from './propTypes/types.ts';
import {useState} from 'react';
import {Driver} from '../../models/driver.ts';

export function useStockCheckInState(): StockCheckInStates {
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
  const [selectedDriver, setSelectedDriver] = useState<string>(
    localStorage.getItem('selected_driver') || '',
  );
  const [isDriverGridLoading, setIsDriverGridLoading] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);
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
  };
}
