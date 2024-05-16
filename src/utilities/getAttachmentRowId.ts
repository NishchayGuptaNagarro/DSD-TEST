import {Row} from 'component/Table/propTypes/types.ts';

export function getAttachmentRowId(row: Row) {
  if (typeof row.attachmentId === 'number') {
    return row.attachmentId;
  } else {
    throw new Error('row id should be number');
  }
}
