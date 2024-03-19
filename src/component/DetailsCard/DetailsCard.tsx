import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import './DetailsCard.scss';
import {ReactElement} from 'react';

function DetailsCard({
  heading,
  icon,
  detail1,
  detail2,
}: {
  heading: string;
  icon: ReactElement<SVGSVGElement>;
  detail1: string;
  detail2: string;
}) {
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
          {icon}
        </Stack>
        <Typography fontWeight={600} fontSize={18}>
          {detail1}
        </Typography>
        <Typography fontWeight={400} fontSize={18}>
          {detail2}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DetailsCard;
