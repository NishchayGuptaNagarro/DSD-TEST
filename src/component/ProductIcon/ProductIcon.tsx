import {Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import styles from 'styles/design-systems.module.scss';
import {ProductIconProps} from './propTypes/types.ts';

function ProductIcon({productName, productId, productImage}: ProductIconProps) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      direction="row"
      spacing={2}
      display={'flex'}
      sx={{padding: '14px 0px 16px', marginLeft: '4px'}}>
      {/*Avatar component displays image in a circular icon*/}
      <Avatar
        alt={productName}
        src={productImage}
        sx={{
          width: 40,
          height: 40,
        }}
      />
      <Stack
        spacing={0}
        sx={{
          paddingTop: '2px',
          display: 'flex',
          width: '100%',
          maxWidth: '200px',
          minWidth: '50px',
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: '50%',
        }}>
        <Stack sx={{}}>
          <Typography
            variant="h5"
            noWrap
            fontSize={styles.fontSizeSm}
            color={styles.charcoalDark}
            fontWeight={styles.fontWeightNormal}>
            {productName}
          </Typography>
        </Stack>
        <Typography
          variant="subtitle1"
          color={styles.grayCharcoal}
          fontSize={styles.fontSizeXsm}
          fontWeight={styles.fontWeightNormal}>
          {productId}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default ProductIcon;

