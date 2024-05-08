import {styled} from '@mui/material';
import Button from '@mui/material/Button';

const BlackButton = styled(Button)({
  minWidth: 80,
  backgroundColor: 'black',
  '&:hover': {
    backgroundColor: 'black',
  },
});

export default BlackButton;
