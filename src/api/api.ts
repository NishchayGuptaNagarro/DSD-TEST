import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {languages} from 'utilities/enums.ts';
import {generateIdempotencyKey} from 'utilities/idempotencyHelper.ts';
import {
  generateCorrelationId,
  isCorrelationIdExpired,
} from '../utilities/correlationHelper';
import {
  URL,
  exceptionUrls,
  langCodeEndpoints,
  timeZoneEndpoints,
} from './config.ts';

const genericHeaders = {'Content-type': 'application/json'};

export const api = axios.create({
  baseURL: URL,
  headers: genericHeaders,
});

export const setCorrelationIdHeader = (request: InternalAxiosRequestConfig) => {
  try {
    const correlationIdStr = localStorage.getItem('correlationIdObject');
    const correlationId = correlationIdStr
      ? JSON.parse(correlationIdStr)
      : null;

    if (correlationId && !isCorrelationIdExpired(correlationId.timestamp)) {
      request.headers.set('X-Correlation-ID', correlationId.id);
    } else {
      const newCorrelationId = generateCorrelationId();
      request.headers.set('X-Correlation-ID', newCorrelationId);
    }
  } catch (error) {
    console.error('Error setting correlation ID header:', error);
  }
};

export const setLanguageHeader = (request: InternalAxiosRequestConfig) => {
  try {
    if (langCodeEndpoints.some(endpoint => request.url?.includes(endpoint))) {
      const langCode =
        localStorage.getItem('currentLanguage') || languages.ENGLISH;
      request.headers.set('X-Lang-Code', langCode.toUpperCase());
    }
  } catch (error) {
    console.error('Error setting X-Lang-Code header:', error);
  }
};

export const setTimeZoneHeader = (request: InternalAxiosRequestConfig) => {
  try {
    if (timeZoneEndpoints.some(endpoint => request.url?.includes(endpoint))) {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      request.headers.set('X-Time-Zone', timeZone);
    }
  } catch (error) {
    console.error('Error setting X-Time-Zone header:', error);
  }
};

api.interceptors.request.use(async (request: InternalAxiosRequestConfig) => {
  const userToken = localStorage.getItem('access_token');
  if (userToken) {
    request.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;

    if (
      ['PUT', 'PATCH', 'POST', 'DELETE'].includes(
        request.method?.toUpperCase() as string,
      ) &&
      !exceptionUrls.some(endpoint => request.url?.includes(endpoint))
    ) {
      if (request.url) {
        const idempotenceKey = generateIdempotencyKey(
          request.data,
          userToken,
          request.url,
        );
        request.headers['X-Idempotency-Key'] = idempotenceKey;
      }
    }
  }
  await setCorrelationIdHeader(request);
  setLanguageHeader(request);
  setTimeZoneHeader(request);
  return request;
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log('Response now :', JSON.stringify(response));
    return response;
  },
  (error: AxiosError | Error) => {
    // console.error('error now :', JSON.stringify(error));
    return Promise.reject(error);
  },
);
