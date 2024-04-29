import {useOutletContext} from 'react-router-dom';

import Table from '../../../component/Table/Table.tsx';
import {DriverOutletContext, ProductApiResponse} from '../propTypes/types.ts';
import {useEffect} from 'react';
import {Row} from '../../../component/Table/propTypes/types.ts';
import {AxiosResponse} from 'axios';
import {api} from '../../../axios/api.ts';
import {checkApiError} from '../../../utilities/checkApiError.ts';

const OrderTable = () => {
  const {columns, getRowId, isTableLoaded, handleTableLoaded, setRows, rows} =
    useOutletContext<DriverOutletContext>();

  async function fetchRows() {
    let response: AxiosResponse<ProductApiResponse>;
    let products: Row[];
    try {
      response = await api.get(
        `/warehouse/vanseller-dashboard-for-warehouse?user_id=${localStorage.getItem('selected_driver')}`,
      );
      console.log(response);
      checkApiError(response);
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
      handleTableLoaded(true);
    } catch (error) {
      console.log(error);
      setRows([]);
      handleTableLoaded(true);
    }
  }
  useEffect(() => {
    fetchRows();
    return () => {
      setRows([]);
      handleTableLoaded(false);
    };
  }, []);

  return (
    <>
      <Table
        showLoading={!isTableLoaded}
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      />
    </>
  );
};

export default OrderTable;
