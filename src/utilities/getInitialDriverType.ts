function getInitialDriverType() {
  const initialType = sessionStorage.getItem('selected_driver_type');
  if (
    initialType == 'VAN-SELLER' ||
    initialType == 'DELIVERY' ||
    initialType == 'HYBRID'
  ) {
    return initialType;
  } else {
    const defaultType = 'VAN-SELLER';
    sessionStorage.setItem('selected_driver_type', defaultType);
    return defaultType;
  }
}

export default getInitialDriverType;
