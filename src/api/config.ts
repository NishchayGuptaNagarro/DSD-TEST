export const URL = 'https://django-backend.cfapps.eu20-001.hana.ondemand.com/';

// Add exception list for idempotency key
export const exceptionUrls = [
    '/refresh-token',
    '/forgot-password',
    '/accounts/swagger/',
];