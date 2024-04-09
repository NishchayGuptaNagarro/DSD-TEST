import {useOutletContext} from 'react-router-dom';

import Table from '../Table/Table';
import {DriverOutletContext} from '../../screens/SelectDriver/propTypes/types.ts';

const OrderTable = () => {
  const {rows, columns, getRowId} = useOutletContext<DriverOutletContext>();
  return (
    <>
      <Table rows={rows} columns={columns} getRowId={getRowId} />
    </>
  );
};

export default OrderTable;
