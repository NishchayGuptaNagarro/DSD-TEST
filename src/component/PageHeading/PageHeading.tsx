//This component will display page heading for each page, it will require a heading a subheading prop.
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {PageHeadingProps} from './propTypes/types.ts';

function PageHeading({heading, subHeading}: PageHeadingProps) {
  return (
    <>
      <Box sx={{color: '#344767'}} marginBottom={2}>
        <Typography className={'font-xl'} variant="h2" fontWeight={700}>
          {heading}
        </Typography>
        <Typography className={'font-md'} variant="h3" fontWeight={400}>
          {subHeading}
        </Typography>
      </Box>
    </>
  );
}

export default PageHeading;
