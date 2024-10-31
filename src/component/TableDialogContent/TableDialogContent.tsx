import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import cross from 'assets/SVG/Cross.svg';
import Table from 'component/Table/Table.tsx';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';
import {TableDialogContentProps} from './propTypes/types';

export default function TableDialogContent({
  rows,
  columns,
  getRowId,
  setShowDialog,
  selectedDriverId,
  dialogHeader,
}: TableDialogContentProps) {
  const {t} = useTranslation();

  return (
    <DialogContent>
      <div className={'dialog-header'}>
        <Typography
          variant="h4"
          sx={{
            fontSize: styles.fontSizeXxl,
            fontWeight: styles.fontWeightNormal,
            color: styles.charcoalDark,
            marginBottom: 1,
          }}>
          {`${selectedDriverId}'s ` + t(dialogHeader)}
        </Typography>
        <div className={'cross-container'}>
          <IconButton
            onClick={() => {
              setShowDialog(false);
            }}>
            <img src={cross} className="cross-img" alt="no-image-present" />
          </IconButton>
        </div>
      </div>
      <Table
        noOfRows={5}
        showMenu={false}
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        showLoading={false}
        withBorder={true}
      />
    </DialogContent>
  );
}
