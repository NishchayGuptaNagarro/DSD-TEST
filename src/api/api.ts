import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { URL, exceptionUrls } from './config.ts';
import {
  generateCorrelationId,
  isCorrelationIdExpired,
} from '../utilities/correlationHelper';
import { generateIdempotencyKey } from 'utilities/idempotencyHelper.ts';

const genericHeaders = { 'Content-type': 'application/json' };

export const api = axios.create({
  baseURL: URL,
  headers: genericHeaders,
});

export const setCorrelationIdHeader = async (request: any) => {
  try {
    let correlationIdStr = await localStorage.getItem('correlationIdObject');
    let correlationId = correlationIdStr ? JSON.parse(correlationIdStr) : null;

    if (correlationId && !isCorrelationIdExpired(correlationId.timestamp)) {
      request.headers.set('X-Correlation-ID', correlationId.id);
    } else {
      await generateCorrelationId();
      let updatedCorrelationIdStr = await localStorage.getItem(
        'correlationIdObject',
      );
      let updatedCorrelationId = updatedCorrelationIdStr
        ? JSON.parse(updatedCorrelationIdStr)
        : null;
      request.headers.set('X-Correlation-ID', updatedCorrelationId.id);
    }
  } catch (error) {
    console.error('Error setting correlation ID header:', error);
  }
};



api.interceptors.request.use(async (request: InternalAxiosRequestConfig) => {
  const userToken = localStorage.getItem('access_token');
  if (userToken) {
    request.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;

    if (
      ['PUT', 'PATCH', 'POST','DELETE'].includes(
        request.method?.toUpperCase() as string,
      ) &&
      !exceptionUrls.includes(request.url as string)
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
  return request;
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log('Response now :', JSON.stringify(response));
    return response;
  },
  (error: AxiosError | Error) => {
    // console.log('error now :', JSON.stringify(error));
    return Promise.reject(error);
  },
);