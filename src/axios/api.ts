import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export const URL = 'https://django-backend.cfapps.eu20-001.hana.ondemand.com/';

const genericHeaders = {'Content-type': 'application/json'};

export const api = axios.create({
  baseURL: URL,
  headers: genericHeaders,
});

api.interceptors.request.use((request: InternalAxiosRequestConfig) => {
  if (localStorage.getItem('access_token')) {
    request.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
  }
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
