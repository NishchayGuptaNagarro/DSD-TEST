import {useOutletContext} from 'react-router-dom';

import Table from '../Table/Table.tsx';
import {
  DriverOutletContext,
  ProductApiResponse,
} from '../../screens/SelectDriver/propTypes/types.ts';
import {useEffect, useState} from 'react';
import {Row} from '../Table/propTypes/types.ts';
import {AxiosResponse} from 'axios';
import {api} from '../../axios/api.ts';

const OrderTable = () => {
  const {columns, getRowId} = useOutletContext<DriverOutletContext>();
  const [rows, setRows] = useState<Row[]>([]);
  async function fetchRows() {
    let response: AxiosResponse<ProductApiResponse>;
    let products: Row[];
    try {
      response = await api.get(
        `/warehouse/vanseller-dashboard-for-warehouse?user_id=${localStorage.getItem('selected_driver')}`,
      );

      products = response.data.data.map(product => {
        const parsedRes: Row = {
          productId: Number(product.product_id),
          name: product.description,
          description: product.description,
          imageSrc: 'data:image/png;base64,' + product.img.product_image,
          initialStock: product.quantity,
        };

        return parsedRes;
      });
      setRows(products);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchRows();
  }, []);
  return (
    <>
      <Table rows={rows} columns={columns} getRowId={getRowId} />
    </>
  );
};

export default OrderTable;
