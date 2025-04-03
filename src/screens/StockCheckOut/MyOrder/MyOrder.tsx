import {api} from 'api/api.ts';
import {AxiosResponse, isAxiosError} from 'axios';
import {Row} from 'component/Table/propTypes/types';
import {
  MyOrderApiResponse,
  MyOrderDetailApiResponse,
  StockCheckOutContext,
} from '../propTypes/types';
import {useOutletContext} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Table from 'component/Table/Table.tsx';
import {myOrdercolumns, orderDetailsColumns} from './MyOrderCol/MyOrderColDef';
import './MyOrder.scss';
import {Dialog} from '@mui/material';
import TableDialogContent from 'component/TableDialogContent/TableDialogContent';

function MyOrder() {
  const {setRows, rows} = useOutletContext<StockCheckOutContext>();

  // State variables
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTableLoaded, setIsTableLoaded] = useState(false);
  const [dialogTableRow, setDialogTableRow] = useState<Row[]>([]);
  const [isDialogTableLoading, setDialogTableLoading] = useState(false);

  // Fetch orders
  const fetchRows = async (page = 1) => {
    try {
      const response: AxiosResponse<MyOrderApiResponse> = await api.get(
        `/warehouse/preorders?user_id=${sessionStorage.getItem('selected_driver')}&page=${page}`,
      );

      const orders: Row[] = (response?.data?.data?.orders || []).map(order => ({
        customerId: Number(order.customer_id),
        name: order.customer_name,
        orderId: Number(order.order_id),
      }));

      setRows(orders);
      setIsTableLoaded(true);
    } catch (error) {
      console.error(error);

      const statusCode = isAxiosError(error) ? error.response?.status : null;

      if (statusCode === 400) {
        setIsDialogOpen(true);
      }

      setRows([]);
      setIsTableLoaded(true);
    }
  };

  // Fetch order details
  const fetchOrderDetails = async (orderId: number) => {
    setDialogTableLoading(true);

    try {
      const response: AxiosResponse<MyOrderDetailApiResponse> = await api.get(
        `/warehouse/preorder-products?pre_order_number=${orderId}&page=1`,
      );

      const orders: Row[] = (response?.data?.data?.order_lines || []).map(
        product => ({
          productId: product.product_id,
          description: product.description,
          imageSrc: product.img,
          uom: product.unit_of_measure,
          quantity: product.quantity,
        }),
      );

      setDialogTableRow(orders);
    } catch (error) {
      console.error(error);

      const statusCode = isAxiosError(error) ? error.response?.status : null;

      if (statusCode === 400) {
        setIsDialogOpen(true);
      }

      setDialogTableRow([]);
    } finally {
      setDialogTableLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();

    return () => {
      setRows([]);
    };
  }, []);

  // Helper functions
  const getProductRowId = (row: Row) => {
    if (typeof row.orderId === 'number') {
      return row.orderId;
    }
    throw new Error('Order ID should be a number');
  };

  function getDialogProductRowId(row: Row): string | number {
    if (
      typeof row.productId === 'string' ||
      typeof row.productId === 'number'
    ) {
      return row.productId;
    }
    throw new Error('Invalid product id: must be string or number');
  }

  const handleOrderInfosClick = (orderId: number) => {
    fetchOrderDetails(orderId);
    setIsDialogOpen(true);
  };

  const handlePageChange = (page) => {
    fetchRows(page); // Fetch new data for the current page
  };
  // JSX rendering
  return (
    <>
      <Dialog
        className="dialog-position-center table-dialog"
        fullWidth
        maxWidth="md"
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}>
        <TableDialogContent
          rows={dialogTableRow}
          columns={orderDetailsColumns}
          getRowId={getDialogProductRowId}
          setShowDialog={() => setIsDialogOpen(false)}
          showLoading={isDialogTableLoading}
          selectedDriverId=""
          dialogHeader="table.orderDetails"
          noOfRows={3}
        />
      </Dialog>

      <Table
        noOfRows={4}
        showMenu={false}
        showLoading={!isTableLoaded}
        rows={rows}
        columns={myOrdercolumns(handleOrderInfosClick)}
        getRowId={getProductRowId}
        minHeight={384}
        handlePageChange={handlePageChange}

      />

    </>
  );
}

export default MyOrder;
