import {Row} from 'component/Table/propTypes/types.ts';

export interface Attachment extends Row {
  attachmentId: number;
  description: string;
  attachments: string[];
}
export interface AttachmentStackProps {
  attachments: string[];
}
