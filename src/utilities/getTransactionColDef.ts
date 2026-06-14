import {GridColDef} from '@mui/x-data-grid';
import {OrdersResponse} from 'models/DriverHistoryResponse';
import {driverTypes} from 'models/driverTypes';
import {deliveryTransactionColDef} from 'utilities/DeliveryTransactionColDef/DeliveryTransactionColDef';
import {driverRoles} from 'utilities/enums';
import {vanSellerTransactionColDef} from 'utilities/VanSellerTransactionColDef/VanSellerTransactionColDef';

export const getTransactionColDef = (
  driverType: driverTypes,
  handleOrderInfoClick?: (orderInfo: OrdersResponse[]) => void,
): GridColDef[] => {
  if (driverType === 'DELIVERY') {
    if (!handleOrderInfoClick) {
      return [];
    }
    return deliveryTransactionColDef(handleOrderInfoClick);
  }

  return vanSellerTransactionColDef;
};
