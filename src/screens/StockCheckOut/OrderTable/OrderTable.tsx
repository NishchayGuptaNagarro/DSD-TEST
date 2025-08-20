import {api} from 'api/api.ts';
import checkInError from 'assets/LOTTIE/CheckInError.json';
import {AxiosResponse, isAxiosError} from 'axios';
import InfoAlertDialog from 'component/InfoAlertDialog/InfoAlertDialog.tsx';
import {Row} from 'component/Table/propTypes/types.ts';
import Table from 'component/Table/Table.tsx';
import timelineContext from 'context/timeline/timelineContext.ts';
import {Product} from 'models/Product.ts';
import {useContext, useEffect, useState} from 'react';
import Lottie from 'react-lottie';
import {useOutletContext} from 'react-router-dom';
import {getProductRowId} from 'utilities/getProductRowId.ts';
import {ProductApiResponse, StockCheckOutContext} from '../propTypes/types.ts';
import {orderColDef} from './OrderColDef/OrderColDef.tsx';

const OrderTable = () => {
  const {setRows, rows, driverType} = useOutletContext<StockCheckOutContext>();
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
        `/warehouse/driver-dashboard-for-warehouse?business_role_id=${driverType}&&user_id=${sessionStorage.getItem('selected_driver')}`,
      );
      console.log(response);

      products = response.data.data.map(product => {
        const parsedRes: Product = {
          productId: product.product_id,
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

  return (
    <>
      <InfoAlertDialog
        titleText={'alert.title1'}
        messageText={'alert.text3'}
        closeBtnText={'alert.btn2'}
        isOpen={isDialogOpen}
        handleDismiss={handleDialogDismiss}>
        <Lottie
          options={{
            loop: true,
            animationData: checkInError,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          height={50}
          width={50}
        />
      </InfoAlertDialog>
      <Table
        noOfRows={4}
        showMenu={false}
        showLoading={!isTableLoaded}
        rows={rows}
        columns={orderColDef}
        getRowId={getProductRowId}
        minHeight={384}
      />
    </>
  );
};

export default OrderTable;

