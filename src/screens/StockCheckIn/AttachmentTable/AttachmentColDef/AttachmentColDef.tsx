import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import {
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import ColumnHeader from 'component/ColumnHeader/ColumnHeader.tsx';
import {Attachment, AttachmentStackProps} from '../propTypes/types.ts';

export const attachmentColDef: GridColDef[] = [
  {
    field: 'description',
    headerName: 'table.attachmentDesc',
    flex: 0.5,
    headerClassName: 'font-md',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    cellClassName: 'font-md',
    sortable: false,
  },
  {
    field: 'attachments',
    headerName: 'table.attachments',
    headerAlign: 'center',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    headerClassName: 'font-md',
    renderCell: (params: GridRenderCellParams<Attachment, string[]>) => {
      return <AttachmentStack attachments={params.value || []} />;
    },
    flex: 0.5,
    cellClassName: 'font-sm',
    sortable: false,
    align: 'center',
  },
];

function AttachmentStack({attachments}: AttachmentStackProps) {
  return (
    <Stack flexDirection={'row'} gap={1}>
      {attachments.map((link, index) => {
        return (
          <Link key={index} download={'attachment.png'} href={link}>
            Attachment No: {index + 1}
          </Link>
        );
      })}
    </Stack>
  );
}
