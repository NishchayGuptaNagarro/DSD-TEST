import {Row} from 'component/Table/propTypes/types.ts';
import {Drivers} from 'models/Driver.ts';
import {driverTypes} from 'models/driverTypes.ts';
import {useState} from 'react';
import getInitialDriverType from 'utilities/getInitialDriverType.ts';
import {SelectDriverStates} from './propTypes/types.ts';

export function useStockCheckOutState(): SelectDriverStates {
  const [driverArray, setDriverArray] = useState<Drivers>({
    'VAN-SELLER': [],
    DELIVERY: [],
    HYBRID: [],
  });

  const [driverType, setDriverType] = useState<driverTypes>(
    getInitialDriverType(),
  );
  const sharedRows :Row[] = []
  const [rows, setRows] = useState<Row[]>(sharedRows);
  const [selectedDriver, setSelectedDriver] = useState<string>('');
  const [isDriverGridLoading, setIsDriverGridLoading] = useState(true);
  const [isSignatureLoaded, setIsSignatureLoaded] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(true);
  const resetRows = () => {
    sharedRows.splice(0, sharedRows.length); // mutates the shared array
    setRows(sharedRows);                      // sets state to the same reference — React sees no change
  };

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
    resetRows,
  };
}

