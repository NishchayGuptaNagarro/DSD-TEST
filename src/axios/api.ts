import axios from 'axios';

export const URL = 'https://django-backend.cfapps.eu20-001.hana.ondemand.com/';

const genericHeaders = {'Content-type': 'application/json'};

export const api = axios.create({
  baseURL: URL,
  headers: genericHeaders,
});

api.interceptors.request.use((request: any) => {
  if (localStorage.getItem('access_token')) {
    request.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
  }
  return request;
});

api.interceptors.response.use(
  (response: any) => {
    // console.log('Response now :', JSON.stringify(response));
    return response;
  },
  (error: any) => {
    // console.log('error now :', JSON.stringify(error));
    return Promise.reject(error);
  },
);
