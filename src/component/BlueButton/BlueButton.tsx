import {styled} from '@mui/material';
import Button from '@mui/material/Button';
import styles from 'styles/design-systems.module.scss';

const BlueButton = styled(Button)({
  minWidth: 120,
  backgroundColor: styles.deepNavy,
  borderRadius: '3px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: styles.deepNavy,
  },
  '&:disabled': {
    backgroundColor: styles.bgFrostedOceanBlue,
    color: styles.whitePure,
  },
});

export default BlueButton;

