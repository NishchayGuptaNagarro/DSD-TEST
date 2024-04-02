import {useOutletContext} from 'react-router-dom';
import {DriverOutletContext} from '../../screens/SelectDriver/SelectDriver';
import Table from '../Table/Table';

const OrderTable = () => {
  const {rows, columns, getRowId} = useOutletContext<DriverOutletContext>();
  return (
    <>
      <Table rows={rows} columns={columns} getRowId={getRowId} />
    </>
  );
};

export default OrderTable;
