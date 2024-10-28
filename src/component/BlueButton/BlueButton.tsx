import {styled} from '@mui/material';
import Button from '@mui/material/Button';
import styles from 'styles/design-systems.module.scss';

const BlueButton = styled(Button)({
  minWidth: 120,
  backgroundColor: styles.deepNavy,
  '&:hover': {
    backgroundColor: styles.deepNavy,
  },
});

export default BlueButton;

