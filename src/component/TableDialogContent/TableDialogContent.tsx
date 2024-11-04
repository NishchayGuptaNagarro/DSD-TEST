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
  noOfRows = 5,
}: TableDialogContentProps) {
  const {t} = useTranslation();

  return (
    <DialogContent>
      <div className={'dialog-header'}>
        <Typography
          variant="h4"
          sx={{
            fontSize: styles.fontSizeLgPlus,
            fontWeight: styles.fontWeightNormal,
            color: styles.charcoalDark,
            marginBottom: 1,
          }}>
          {`${selectedDriverId}'s ` + t(dialogHeader)}
        </Typography>
        <div className={'cross-container'}>
          <IconButton
            sx={{height: '28px', width: '28px'}}
            onClick={() => {
              setShowDialog(false);
            }}>
            <img src={cross} alt="no-image-present" className="cross-img" />
          </IconButton>
        </div>
      </div>
      <Table
        noOfRows={noOfRows}
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
