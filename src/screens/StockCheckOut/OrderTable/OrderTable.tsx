import {useOutletContext} from 'react-router-dom';

import Table from 'component/Table/Table.tsx';
import {StockCheckOutContext, ProductApiResponse} from '../propTypes/types.ts';
import {useContext, useEffect, useState} from 'react';
import {Row} from 'component/Table/propTypes/types.ts';
import {AxiosResponse} from 'axios';
import {api} from 'api/api.ts';
import {checkApiError} from 'utilities/checkApiError.ts';
import timelineContext from 'context/timeline/timelineContext.ts';
import AlertDialog from 'component/AlertDialog/AlertDialog.tsx';
import {orderColDef} from './OrderColDef/OrderColDef.tsx';
import {Product} from 'models/Product.ts';
import {getProductRowId} from 'utilities/getProductRowId.ts';

const OrderTable = () => {
  const {setRows, rows} = useOutletContext<StockCheckOutContext>();
  const {decreaseSteps} = useContext(timelineContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTableLoaded, setIsTableLoaded] = useState(false);

  function handleDialogDismiss() {
    decreaseSteps();
  }

  async function fetchRows() {
    let response: AxiosResponse<ProductApiResponse>;
    let products: Row[];
    try {
      response = await api.get(
        `/warehouse/driver-dashboard-for-warehouse?user_id=${sessionStorage.getItem('selected_driver')}`,
      );
      console.log(response);
      if (response.data.status_code == 400) {
        setIsDialogOpen(true);
        setIsTableLoaded(true);
        return;
      }

      checkApiError(response);
      products = response.data.data.map(product => {
        const parsedRes: Product = {
          productId: Number(product.product_id),
          externalId: product.external_id,
          name: product.description,
          description: product.description,
          imageSrc: product.img,
          uom: product.unit_of_measure,
          quantity: product.quantity,
        };
        return parsedRes;
      });
      setRows(products);
      setIsTableLoaded(true);
    } catch (error) {
      console.log(error);
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

  return (
    <>
      <AlertDialog
        messageText={'alert.text3'}
        closeBtnText={'alert.btn2'}
        isOpen={isDialogOpen}
        handleDismiss={handleDialogDismiss}></AlertDialog>
      <Table
        noOfRows={5}
        showMenu={false}
        showLoading={!isTableLoaded}
        rows={rows}
        columns={orderColDef}
        getRowId={getProductRowId}
      />
    </>
  );
};

export default OrderTable;
