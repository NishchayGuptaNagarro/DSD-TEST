//This component will display page heading for each page, it will require a heading a subheading prop.
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import {PageHeadingProps} from './propTypes/types.ts';
import styles from '../../styles/design-systems.module.scss';

function PageHeading({heading, subHeading}: PageHeadingProps) {
  return (
    <>
      <Box sx={{color: styles.blueSteel}} marginBottom={2}>
        <Typography
          variant="h2"
          fontSize={styles.fontSizeLg}
          fontWeight={styles.fontWeightBold}>
          {heading}
        </Typography>
        <Typography
          fontSize={styles.fontSizeMd}
          variant="h3"
          fontWeight={styles.fontWeightLight}>
          {subHeading}
        </Typography>
      </Box>
    </>
  );
}

export default PageHeading;
