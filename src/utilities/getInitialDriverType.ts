import {driverRoles} from 'utilities/enums';
import {driverTypes} from 'models/driverTypes';

function getInitialDriverType() {
  const initialType = sessionStorage.getItem('selected_driver_type');
  if (
    initialType?.toUpperCase() == driverRoles.VAN_SELLER.toUpperCase() ||
    initialType?.toUpperCase() == driverRoles.DELIVERY.toUpperCase() ||
    initialType?.toUpperCase() == driverRoles.HYBRID.toUpperCase()
  ) {
    return initialType as driverTypes;
  } else {
    const defaultType = driverRoles.VAN_SELLER;
    sessionStorage.setItem('selected_driver_type', defaultType);
    return defaultType;
  }
}

export default getInitialDriverType;
