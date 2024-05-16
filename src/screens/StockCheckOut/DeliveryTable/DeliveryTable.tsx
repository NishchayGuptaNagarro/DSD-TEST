import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import {useEffect, useState} from 'react';
import {useOutletContext} from 'react-router-dom';

import Table from 'component/Table/Table.tsx';
import {deliveryColDef} from './DeliveryColDef/DeliveryColDef.tsx';
import ProductsTable from 'screens/StockCheckOut/ProductsTable/ProductsTable.tsx';

import {StockCheckOutContext} from '../propTypes/types.ts';
import {DeliveryTableRow} from './propTypes/types.ts';
import {Row} from 'component/Table/propTypes/types.ts';
import {Product} from 'models/Product.ts';
import './DeliveryTable.scss';

function DeliveryTable() {
  //----DUMMY DATA-----
  const deliveryTableData: DeliveryTableRow[] = [
    {
      orderId: 1234,
      orderDescription: 'Order for office supplies',
      customerId: 5678,
      customerName: 'Acme Corp',
      products: [
        {
          productId: 1,
          externalId: 'SKU-001',
          name: 'Stapler',
          description: 'Heavy-duty stapler',
          imageSrc: 'data:image/png;base64,yourBase64EncodedImageHere',
          uom: 'pcs',
          quantity: 1000,
        },
        {
          productId: 2,
          externalId: 'SKU-002',
          name: 'Staples',
          description: 'Box of 1000 staples',
          imageSrc: 'data:image/png;base64,anotherBase64EncodedImageHere',
          uom: 'boxes',
          quantity: 1000,
        },
        {
          productId: 3,
          externalId: 'SKU-003',
          name: 'Coffee',
          description: 'Ground coffee beans',
          imageSrc: 'data:image/png;base64,yourCoffeeImageHere',
          initialStock: 10,
          uom: 'bags',
          quantity: 100,
        },
        {
          productId: 4,
          externalId: 'SKU-004',
          name: 'Mug',
          description: 'Ceramic mug',
          imageSrc: 'data:image/png;base64,yourMugImageHere',
          uom: 'pcs',
          quantity: 1000,
        },
        {
          productId: 5,
          externalId: 'SKU-004',
          name: 'Mug',
          description: 'Ceramic mug',
          imageSrc: 'data:image/png;base64,yourMugImageHere',
          uom: 'pcs',
          quantity: 1000,
        },
      ],
    },
    {
      orderId: 5678,
      orderDescription: 'Personal order',
      customerId: 9012,
      customerName: 'John Doe',
      products: [
        {
          productId: 3,
          externalId: 'SKU-003',
          name: 'Coffee',
          description: 'Ground coffee beans',
          imageSrc: 'data:image/png;base64,yourCoffeeImageHere',
          uom: 'bags',
          quantity: 100,
        },
        {
          productId: 4,
          externalId: 'SKU-004',
          name: 'Mug',
          description: 'Ceramic mug',
          imageSrc: 'data:image/png;base64,yourMugImageHere',
          uom: 'pcs',
          quantity: 1000,
        },
      ],
    },
  ];
  //END OF DUMMY DATA ----------------
  const {setRows, rows} = useOutletContext<StockCheckOutContext>();
  const [productArray, setProductArray] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isTableLoaded, setIsTableLoaded] = useState(false);
  function handleShowProducts(products: Product[]) {
    setProductArray(products);
    setShowModal(true);
  }
  function getRowId(row: Row) {
    if (typeof row.orderId === 'number') {
      return row.orderId;
    } else {
      throw new Error('row id should be number');
    }
  }
  function fetchRows() {
    const parsedRows: DeliveryTableRow[] = deliveryTableData;
    setRows(parsedRows);
    setIsTableLoaded(true);
  }
  useEffect(() => {
    fetchRows();
    return () => {
      setRows([]);
    };
  }, []);
  return (
    <>
      <Dialog
        className={'dialog-position-end'}
        fullWidth={true}
        maxWidth={'md'}
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}>
        <DialogContent>
          <ProductsTable products={productArray} />
        </DialogContent>
      </Dialog>
      <Table
        noOfRows={5}
        showMenu={false}
        rows={rows}
        columns={deliveryColDef(handleShowProducts)}
        getRowId={getRowId}
        showLoading={!isTableLoaded}></Table>
    </>
  );
}

export default DeliveryTable;
