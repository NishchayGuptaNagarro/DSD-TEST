import Stack from '@mui/material/Stack';
import {Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import {ProductIconProps} from './propTypes/types.ts';

function ProductIcon({productName, productId, productImage}: ProductIconProps) {
  return (
    <Stack alignItems="center" direction="row" spacing={2}>
      {/*Avatar component displays image in a circular icon*/}
      <Avatar
        alt={productName}
        src={productImage}
        sx={{
          width: 45,
          height: 45,
        }}
      />
      <Stack>
        <Typography className={'font-sm'} variant={'h5'} fontWeight={500}>
          {productName}
        </Typography>
        <Typography className={'font-sm'} variant={'h6'} fontWeight={400}>
          {productId}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default ProductIcon;
