import {useEffect, useState} from 'react';
import {useOutletContext} from 'react-router-dom';
import {StockCheckInContext} from '../propTypes/types.ts';
import {Row} from 'component/Table/propTypes/types.ts';
import Table from 'component/Table/Table.tsx';
import {Attachment} from './propTypes/types.ts';
import {attachmentColDef} from './AttachmentColDef/AttachmentColDef.tsx';

function AttachmentTable() {
  //MOCK DATA
  const mockData: Attachment[] = [
    {
      attachmentId: 1,
      description: 'Invoice',
      attachments: ['invoice1.pdf', 'invoice2.pdf'],
      id: 1,
    },
    {
      attachmentId: 2,
      description: 'Receipt',
      attachments: ['receipt1.pdf', 'receipt2.pdf'],
      id: 2,
    },
  ];
  //END OF MOCK

  const {setRows, rows} = useOutletContext<StockCheckInContext>();
  const [isTableLoaded, setIsTableLoaded] = useState(false);

  function fetchRows() {
    const parsedRows: Attachment[] = mockData;
    setRows(parsedRows);
    setIsTableLoaded(true);
  }
  function getAttachmentRowId(row: Row) {
    if (typeof row.attachmentId === 'number') {
      return row.attachmentId;
    } else {
      throw new Error('row id should be number');
    }
  }
  useEffect(() => {
    fetchRows();
  }, []);
  return (
    <>
      <Table
        rows={rows}
        getRowId={getAttachmentRowId}
        showLoading={!isTableLoaded}
        columns={attachmentColDef}
      />
    </>
  );
}

export default AttachmentTable;
