import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import './DetailsCard.scss';
import {DetailsCardProps} from './propTypes/types.ts';

function DetailsCard({
  heading,
  icon,
  mainInfo,
  secondaryInfo,
}: DetailsCardProps) {
  return (
    // Initial width of card is defined using flexBasis
    <Card variant={'outlined'} sx={{borderRadius: 3, flexBasis: 400}}>
      <CardContent
        sx={{
          color: '#354766',
        }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={1}>
          <Typography fontWeight={500} sx={{color: '#929BAD'}}>
            {heading}
          </Typography>
          <img src={icon} alt={'icon'} />
        </Stack>
        <Typography fontWeight={600} fontSize={18}>
          {mainInfo}
        </Typography>
        <Typography fontWeight={400} fontSize={18}>
          {secondaryInfo}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DetailsCard;
