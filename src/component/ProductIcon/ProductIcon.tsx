import Stack from '@mui/material/Stack';
import {Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';

import {ProductIconProps} from './propTypes/types.ts';
import styles from 'styles/design-systems.module.scss';

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
        <Typography
          fontSize={styles.fontSizeSm}
          variant={'h5'}
          fontWeight={styles.fontWeightNormal}>
          {productName}
        </Typography>
        <Typography
          fontSize={styles.fontSizeXsm}
          variant={'h6'}
          fontWeight={styles.fontWeightLight}>
          {productId}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default ProductIcon;
