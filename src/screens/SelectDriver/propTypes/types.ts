// Generic driver interface
import {DriverNameGridProps} from '../../../component/DriverNameGrid/propTypes/types.ts';
import {TableProps} from '../../../component/Table/propTypes/types.ts';

export interface Driver {
  driverName: string;
  driverId: string;
  driverType: 'VAN-SELLER' | 'DELIVERY' | 'HYBRID';
}

// Interface for screen outlet context provider
export interface DriverOutletContext extends DriverNameGridProps, TableProps {}

// Interface for api response
export interface ApiDriverData {
  username: string;
  business_role_id: 'VAN-SELLER' | 'DELIVERY' | 'HYBRID';
  user_id: string;
  business_partner_id: string;
  creation_date: string;
  territory: string | null; // Assuming territory can be a string or null
  employee_id: string;
  email: string;
  is_active: boolean;
  date_joined: string;
  updated_at: string;
}
