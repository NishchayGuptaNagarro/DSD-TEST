//This component will display page heading for each page, it will require a heading a subheading prop.
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import {PageHeadingProps} from './propTypes/types.ts';

function PageHeading({heading, subHeading}: PageHeadingProps) {
  return (
    <>
      <Box sx={{color: '#344767'}} marginBottom={2}>
        <Typography variant="h2" fontSize={18} fontWeight={700}>
          {heading}
        </Typography>
        <Typography fontSize={18} variant="h3" fontWeight={400}>
          {subHeading}
        </Typography>
      </Box>
    </>
  );
}

export default PageHeading;
