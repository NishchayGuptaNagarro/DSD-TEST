import {api} from 'api/api.ts';
import {AxiosResponse} from 'axios';

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
  } catch (error) {
    console.error(error);
  }
}

