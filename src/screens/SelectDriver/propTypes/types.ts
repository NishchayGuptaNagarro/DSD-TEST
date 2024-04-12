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

// Interface for driver api response
interface ApiDriverData {
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
export interface DriverApiResponse {
  status_code: number;
  msg?: string;
  data: ApiDriverData[];
}

//Interfaces for product API response

interface ApiProductData {
  product_id: string;
  product_name: string;
  status: string;
  creation_date: string;
  unit_of_measure: string;
  description: string;
  external_id: string;
  category_id: string;
  updated_at: string;
  quantity: string;
  img: ApiProductImage;
}

interface ApiProductImage {
  mime_type: string | null;
  updated_at: string;
  product_image: string;
  product_id: string;
  creation_date: string;
}

export interface ProductApiResponse {
  status_code: number;
  data: ApiProductData[];
}
