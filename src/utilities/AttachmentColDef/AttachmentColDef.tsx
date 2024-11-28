import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import {
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import AttachmentBlue from 'assets/SVG/AttachmentBlue.svg';
import ColumnHeader from 'component/ColumnHeader/ColumnHeader.tsx';
import {Attachment, AttachmentStackProps} from 'models/Attachment.ts';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';

export const attachmentColDef: (
  handleClick: (src: string) => void,
) => GridColDef[] = handleClick => [
  {
    field: 'description',
    headerName: 'table.attachmentDesc',
    flex: 0.5,
    headerClassName: 'font-md font-normal',
    renderHeader: (params: GridColumnHeaderParams) => {
      return (
        <div className="attachment-header">
          <ColumnHeader headerName={params.colDef.headerName || ''} />
        </div>
      );
    },
    renderCell: (params: GridRenderCellParams<Attachment[]>) => {
      return <div className="attachment-cell">{params.value}</div>;
    },
    cellClassName: 'font-sm font-normal',
    sortable: false,
  },
  {
    field: 'attachment',
    headerName: 'table.attachments',
    headerAlign: 'center',
    renderHeader: (params: GridColumnHeaderParams) => {
      return <ColumnHeader headerName={params.colDef.headerName || ''} />;
    },
    headerClassName: 'font-md font-normal',
    renderCell: (params: GridRenderCellParams<Attachment, string>) => {
      return (
        <AttachmentStack
          handleClick={handleClick}
          attachment={params.value || ''}
        />
      );
    },
    flex: 0.5,
    cellClassName: 'font-sm font-normal',
    sortable: false,
    align: 'center',
  },
];

function AttachmentStack({attachment, handleClick}: AttachmentStackProps) {
  const {t} = useTranslation();
  return (
    <Stack
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'end'}
      width={'100%'}
      gap={1}>
      <Stack
        flexDirection={'row'}
        alignItems={'center'}
        mr={'14%'}
        justifyContent={'space-between'}
        width={'44%'}
        gap={1}>
        <Button
          variant="text"
          className="action-button"
          sx={{
            textTransform: 'none',
            fontWeight: styles.fontWeightBolder,
            fontSize: styles.fontSizeMd,
            color: styles.deepNavy,
            borderRadius: '20px',
            '&:hover': {
              backgroundColor: styles.whitePure,
            },
          }}
          size={'small'}
          onClick={() => {
            handleClick(attachment);
          }}>
          {t('table.view')}
        </Button>
        <Link
          className={'attachment-download'}
          download={'attachment.png'}
          href={attachment}>
          <img
            src={AttachmentBlue}
            className="attachment-icon"
            alt="no-image-present"
          />
        </Link>
      </Stack>
    </Stack>
  );
}

