import {Row} from 'component/Table/propTypes/types.ts';

export interface Attachment extends Row {
  attachmentId: number;
  description: string;
  attachment: string;
}
export interface AttachmentStackProps {
  attachment: string;
  handleClick: (src: string) => void;
}
