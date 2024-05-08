import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import {useEffect, useState} from 'react';
import {useOutletContext} from 'react-router-dom';

import Table from '../../../component/Table/Table.tsx';
import {DriverOutletContext} from '../propTypes/types.ts';
import {DeliveryTableRow} from './propTypes/types.ts';
import {Row} from '../../../component/Table/propTypes/types.ts';
import {deliveryColDef} from './DeliveryColDef/DeliveryColDef.tsx';
import ProductsTable from '../ProductsTable/ProductsTable.tsx';
import {Product} from '../../../models/product.ts';
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
          initialStock: 20,
          uom: 'pcs',
          quantity: 1000,
        },
        {
          productId: 2,
          externalId: 'SKU-002',
          name: 'Staples',
          description: 'Box of 1000 staples',
          imageSrc: 'data:image/png;base64,anotherBase64EncodedImageHere',
          initialStock: 50,
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
          initialStock: 1,
          uom: 'pcs',
          quantity: 1000,
        },
        {
          productId: 5,
          externalId: 'SKU-004',
          name: 'Mug',
          description: 'Ceramic mug',
          imageSrc: 'data:image/png;base64,yourMugImageHere',
          initialStock: 1,
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
          initialStock: 1,
          uom: 'pcs',
          quantity: 1000,
        },
      ],
    },
  ];
  //END OF DUMMY DATA ----------------
  const {isTableLoaded, handleTableLoaded, setRows, rows} =
    useOutletContext<DriverOutletContext>();
  const [productArray, setProductArray] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);

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
    handleTableLoaded(true);
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
      <Dialog
        className={'products-table'}
        fullWidth={true}
        maxWidth={'md'}
        open={showModal}
        sx-={{justifyContent: 'flex-start'}}
        onClose={() => {
          setShowModal(false);
        }}>
        <DialogContent>
          <ProductsTable products={productArray} />
        </DialogContent>
      </Dialog>
      <Table
        rows={rows}
        columns={deliveryColDef(handleShowProducts)}
        getRowId={getRowId}
        showLoading={!isTableLoaded}></Table>
    </>
  );
}

export default DeliveryTable;
