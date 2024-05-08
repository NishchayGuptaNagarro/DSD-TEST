import {useOutletContext} from 'react-router-dom';

import Table from 'component/Table/Table.tsx';
import {DriverOutletContext, ProductApiResponse} from '../propTypes/types.ts';
import {useContext, useEffect, useState} from 'react';
import {Row} from 'component/Table/propTypes/types.ts';
import {AxiosResponse} from 'axios';
import {api} from 'axios/api.ts';
import {checkApiError} from 'utilities/checkApiError.ts';
import timelineContext from 'context/timeline/timelineContext.ts';
import AlertDialog from 'component/AlertDialog/AlertDialog.tsx';
import {driverColDef} from './DriverColDef/DriverColDef.tsx';
import {Product} from 'models/product.ts';

const OrderTable = () => {
  const {isTableLoaded, handleTableLoaded, setRows, rows} =
    useOutletContext<DriverOutletContext>();
  const {decreaseSteps} = useContext(timelineContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  function getRowId(row: Row) {
    if (typeof row.productId === 'number') {
      return row.productId;
    } else {
      throw new Error('row id should be number');
    }
  }
  function handleDialogDismiss() {
    decreaseSteps();
  }
  async function fetchRows() {
    let response: AxiosResponse<ProductApiResponse>;
    let products: Row[];
    try {
      response = await api.get(
        `/warehouse/driver-dashboard-for-warehouse?user_id=${localStorage.getItem('selected_driver')}`,
      );
      console.log(response);
      if (response.data.status_code == 400) {
        setIsDialogOpen(true);
        handleTableLoaded(true);
        return;
      }

      checkApiError(response);
      products = response.data.data.map(product => {
        const parsedRes: Product = {
          productId: Number(product.product_id),
          externalId: product.external_id,
          name: product.description,
          description: product.description,
          imageSrc: product.img.product_image,
          initialStock: product.quantity,
          uom: product.unit_of_measure,
          quantity: product.quantity,
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
      <AlertDialog
        messageText={'Initial Stock already assigned to driver'}
        closeBtnText={'Dismiss'}
        isOpen={isDialogOpen}
        handleDismiss={handleDialogDismiss}></AlertDialog>
      <Table
        showLoading={!isTableLoaded}
        rows={rows}
        columns={driverColDef}
        getRowId={getRowId}
      />
    </>
  );
};

export default OrderTable;
