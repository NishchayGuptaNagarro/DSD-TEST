export const URL = 'https://django-backend.cfapps.eu20-001.hana.ondemand.com/';
// export const URL =
//   'https://django-backend-demo.cfapps.eu20-001.hana.ondemand.com';
// Add exception list for idempotency key
export const exceptionUrls = [
  '/accounts/login',
  '/accounts/login/prevendor',
  '/accounts/forgot-password',
  '/accounts/refresh-token',
  '/accounts/swagger/',
];
