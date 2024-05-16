import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import DownloadIcon from '@mui/icons-material/Download';
import {
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import ColumnHeader from 'component/ColumnHeader/ColumnHeader.tsx';
import {AttachmentStackProps} from '../../screens/StockCheckIn/AttachmentTable/propTypes/types.ts';
import {Attachment} from '../../models/Attachment.ts';

export const attachmentColDef: (
  handleClick: (src: string) => void,
) => GridColDef[] = handleClick => [
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
    field: 'attachment',
    headerName: 'table.attachments',
    headerAlign: 'center',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    headerClassName: 'font-md',
    renderCell: (params: GridRenderCellParams<Attachment, string>) => {
      return (
        <AttachmentStack
          handleClick={handleClick}
          attachment={params.value || ''}
        />
      );
    },
    flex: 0.5,
    cellClassName: 'font-sm',
    sortable: false,
    align: 'center',
  },
];

function AttachmentStack({attachment, handleClick}: AttachmentStackProps) {
  return (
    <Stack
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={1}>
      <Link
        component="button"
        onClick={() => {
          handleClick(attachment);
        }}>
        View Attachment
      </Link>
      <Link
        className={'attachment-download'}
        download={'attachment.png'}
        href={attachment}>
        <DownloadIcon fontSize={'small'} sx={{mt: 1}} />
      </Link>
    </Stack>
  );
}
