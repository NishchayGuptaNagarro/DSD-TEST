export const URL = 'https://django-backend.cfapps.eu10-004.hana.ondemand.com';
// export const URL =
//   'https://django-backend-demo.cfapps.eu20-001.hana.ondemand.com';
// Add exception list for idempotency key
export const exceptionUrls = [
  'accounts/login',
  'accounts/login/prevendor',
  'accounts/forgot-password',
  'accounts/refresh-token',
  'accounts/swagger/',
];
// Target URLs for X-Lang-Code header
export const langCodeEndpoints = [
  'warehouse/assign-initial-stock',
  'warehouse/driver-dashboard-for-warehouse',
];
// Target URLs for X-Time-Zone header
export const timeZoneEndpoints = [
  'warehouse/driver/history',
  'warehouse/unassign-stock',
  'warehouse/digital-signature',
  'warehouse/driver-dashboard-for-warehouse',
];

