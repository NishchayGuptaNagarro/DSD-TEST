import {api} from 'api/api.ts';
import {AxiosResponse, isAxiosError} from 'axios';
import {Row} from 'component/Table/propTypes/types';
import {MyOrderApiResponse, StockCheckOutContext} from '../propTypes/types';
import {useOutletContext} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { Order } from './propTypes/types';

function MyOrder() {
  const {setRows, rows, driverType} = useOutletContext<StockCheckOutContext>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTableLoaded, setIsTableLoaded] = useState(false);

  async function fetchRows() {
    let response: AxiosResponse<MyOrderApiResponse>;
    let orders: Row[];
    try {
      response = await api.get(
        `/warehouse/preorders?user_id=${sessionStorage.getItem('selected_driver')}&page=1`,
      );
      orders = (response?.data?.data || [] ).map(order => {
        const parsedRes: Order = {
          orderId: Number(order.order_id),
          customerId: Number(order.customer_id),
          name: order.customer_name,
         
        };
        return parsedRes;
      });
      setRows(orders);
      setIsTableLoaded(true);
    } catch (error) {
      console.error(error);
      const statusCode = isAxiosError(error) ? error.response?.status : null;
      if (statusCode == 400) {
        setIsDialogOpen(true);
        setIsTableLoaded(true);
        return;
      }
      setRows([]);
      setIsTableLoaded(true);
    }
  }

  useEffect(() => {
    fetchRows();
    return () => {
      setRows([]);
    };
  }, []);

  return <div>MyOrder</div>;
}

export default MyOrder;
