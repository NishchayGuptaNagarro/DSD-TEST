import {useOutletContext} from 'react-router-dom';
import {StockCheckInContext} from '../propTypes/types.ts';
import {Row} from 'component/Table/propTypes/types.ts';
import Table from 'component/Table/Table.tsx';
import {attachmentColDef} from './AttachmentColDef/AttachmentColDef.tsx';
import './AttachmentTable.scss';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import {useState} from 'react';

function AttachmentTable() {
  const {attachmentArr} = useOutletContext<StockCheckInContext>();
  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  function getAttachmentRowId(row: Row) {
    if (typeof row.attachmentId === 'number') {
      return row.attachmentId;
    } else {
      throw new Error('row id should be number');
    }
  }
  function handleClick(src: string) {
    setImageSrc(src);
    setShowModal(true);
  }

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
          <img src={imageSrc} className={' attachment'} alt={'attachment'} />
        </DialogContent>
      </Dialog>
      <Table
        rows={attachmentArr}
        getRowId={getAttachmentRowId}
        showLoading={false}
        columns={attachmentColDef(handleClick)}
      />
    </>
  );
}

export default AttachmentTable;
