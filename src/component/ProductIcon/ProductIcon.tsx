import {Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import styles from 'styles/design-systems.module.scss';
import {ProductIconProps} from './propTypes/types.ts';

function ProductIcon({productName, productId, productImage}: ProductIconProps) {
  return (
    <Stack
      alignItems="center"
      justifyContent="start"
      direction="row"
      maxWidth={'100%'}
      spacing={1}
      flex={'1'}
      sx={{
        padding: '14px 0px 16px',
        marginLeft: '0px',
      }}>
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
          maxWidth: '72%',
          paddingTop: '2px',
        }}>
        <Typography
          variant="h5"
          noWrap
          fontSize={styles.fontSizeSm}
          color={styles.charcoalDark}
          fontWeight={styles.fontWeightNormal}>
          {productName}
        </Typography>
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

