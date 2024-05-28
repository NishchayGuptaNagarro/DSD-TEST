import {AxiosResponse} from 'axios';
import {api} from 'api/api.ts';
import {checkApiError} from './checkApiError.ts';

export async function sendNotification(message: string) {
  try {
    const response: AxiosResponse = await api.post(
      '/warehouse/send-notification-driver',
      {
        user_id: sessionStorage.getItem('selected_driver'),
        message: message,
        title: 'Nagarro Warehouse',
      },
    );
    console.log(response);
    checkApiError(response);
  } catch (error) {
    console.log(error);
  }
}
