import axios from 'axios';


export let URL = 'https://django-backend.cfapps.eu20-001.hana.ondemand.com/';

const token:string = JSON.parse(localStorage.getItem('access_token') as any);


const genericHeaders = {'Content-type': 'application/json'};

export const api = axios.create({
  baseURL: URL,
  headers: genericHeaders,
});

api.interceptors.request.use((request:any) => {

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;

});


api.interceptors.response.use(
  (response:any) => {
    // console.log('Response now :', JSON.stringify(response));
    return response;
  },
  (error:any) => {
    // console.log('error now :', JSON.stringify(error));
    return Promise.reject(error);
  },
);


