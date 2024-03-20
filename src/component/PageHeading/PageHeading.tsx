//This component will display page heading for each page, it will require a heading a subheading prop.
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {PageHeadingProps} from './propTypes/types.ts';

function PageHeading({heading, subHeading}: PageHeadingProps) {
  return (
    <>
      <Box sx={{color: '#344767'}} marginBottom={2}>
        <Typography variant="h2" fontWeight={700} fontSize={25}>
          {heading}
        </Typography>
        <Typography variant="h3" fontWeight={400} fontSize={18}>
          {subHeading}
        </Typography>
      </Box>
    </>
  );
}

export default PageHeading;
