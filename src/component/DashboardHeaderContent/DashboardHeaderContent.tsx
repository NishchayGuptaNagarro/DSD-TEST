import Typography from '@mui/material/Typography';
import styles from 'styles/design-systems.module.scss';
import {DashboardHeaderContentProps} from './propTypes/types.ts';

export default function AppHeader({
  heading,
  subHeading,
}: DashboardHeaderContentProps) {
  return (
    <>
      <div>
        <Typography
          variant="h2"
          sx={{
            fontSize: styles.fontSizeXxl,
            fontWeight: styles.fontWeightBolder,
            color: styles.charcoalDark,
          }}>
          {heading}
        </Typography>
      </div>
      <div>
        <Typography
          variant="h6"
          sx={{
            fontSize: styles.fontSizeSm,
            fontWeight: styles.fontWeightLight,
            color: styles.grayMuted,
          }}>
          {subHeading}
        </Typography>
      </div>
    </>
  );
}
