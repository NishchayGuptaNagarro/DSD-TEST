import {driverRoles} from 'utilities/enums';

function getInitialDriverType() {
  const initialType = sessionStorage.getItem('selected_driver_type');
  if (
    initialType == driverRoles.VAN_SELLER ||
    initialType == driverRoles.DELIVERY ||
    initialType == driverRoles.HYBRID
  ) {
    return initialType;
  } else {
    const defaultType = driverRoles.VAN_SELLER;
    sessionStorage.setItem('selected_driver_type', defaultType);
    return defaultType;
  }
}

export default getInitialDriverType;
