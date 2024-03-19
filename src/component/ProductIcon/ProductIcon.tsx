import Stack from '@mui/material/Stack';
import {Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';

function ProductIcon({
  productName,
  productId,
  productImage,
}: {
  productName: string;
  productId: string;
  productImage: string;
}) {
  return (
    <Stack alignItems="center" direction="row" spacing={2}>
      {/*Avatar component displays image in a circular icon*/}
      <Avatar
        alt={productName}
        src={productImage}
        sx={{
          width: 63,
          height: 63,
        }}
      />
      <Stack>
        <Typography variant={'h5'} fontWeight={500} fontSize={16}>
          {productName}
        </Typography>
        <Typography variant={'h6'} fontSize={14} fontWeight={400}>
          {productId}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default ProductIcon;
