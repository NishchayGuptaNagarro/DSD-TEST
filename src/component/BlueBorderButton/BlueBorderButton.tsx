import {styled} from '@mui/material';
import Button from '@mui/material/Button';
import styles from 'styles/design-systems.module.scss';

const BlueBorderButton = styled(Button)({
  minWidth: 120,
  marginRight: '2%',
  color: styles.deepNavy,
  backgroundColor: styles.bgColorBeigeLight,
  border: `1px solid ${styles.deepNavy}`,
  boxShadow: 'none',
  borderRadius: '3px',
  textTransform: 'none',
  '&:hover': {backgroundColor: styles.bgColorWhiteSmoke},
});

export default BlueBorderButton;
