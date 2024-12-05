import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Table from 'component/Table/Table.tsx';
import {useState} from 'react';
import {useOutletContext} from 'react-router-dom';
import {attachmentColDef} from 'utilities/AttachmentColDef/AttachmentColDef.tsx';
import {getAttachmentRowId} from 'utilities/getAttachmentRowId.ts';
import {StockCheckInContext} from '../propTypes/types.ts';
import './AttachmentTable.scss';

function AttachmentTable() {
  const {attachmentArr} = useOutletContext<StockCheckInContext>();
  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

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
        noOfRows={5}
        showMenu={false}
        rows={attachmentArr}
        getRowId={getAttachmentRowId}
        showLoading={false}
        columns={attachmentColDef(handleClick)}
        minHeight={344}
      />
    </>
  );
}

export default AttachmentTable;

