import {AxiosResponse} from 'axios';

export function checkApiError(response: AxiosResponse) {
  if (response.data.status_code != 200) {
    throw new Error(response.data.msg);
  }
}
