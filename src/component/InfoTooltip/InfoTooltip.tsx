import InfoIcon from '@mui/icons-material/Info';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';
import './InfoTooltip.scss';
import {InfoTooltipProps} from './propTypes/types';

export function InfoTooltip({title}: InfoTooltipProps) {
  const {t} = useTranslation();
  return (
    <Tooltip
      title={t(title)}
      placement={'bottom-start'}
      slotProps={{
        popper: {
          sx: {
            [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
              {
                marginTop: '2px',
              },
          },
        },
      }}
      componentsProps={{
        tooltip: {
          sx: {
            height: 'auto',
            bgcolor: styles.whitePure,
            color: styles.grayCharcoal,
            fontSize: styles.fontSizeXxsm,
            fontWeight: styles.fontWeightLight,
            boxShadow: `3px 2px 21px 0px ${styles.borderSmokeGray}`,
          },
        },
      }}>
      <div className="icon-wrapper">
        <span className="hover-show">
          <InfoIcon sx={{fontSize: styles.fontSizeMd, padding: 0, margin: 0}} />
        </span>
        <span className="hover-hide">
          <InfoOutlinedIcon
            sx={{fontSize: styles.fontSizeMd, padding: 0, margin: 0}}
            className="info-gray-outlined-icon"
          />
        </span>
      </div>
    </Tooltip>
  );
}
