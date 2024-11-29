import InfoIcon from '@mui/icons-material/Info';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';
import './InfoToolTip.scss';
import {InfoToolTipProps} from './propTypes/types';

export function InfoToolTip({title}: InfoToolTipProps) {
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
            boxShadow: `2.96px 2.37px 20.7px 0px ${styles.borderSmokeGray}`,
          },
        },
      }}>
      <div className="icon-wrapper">
        <span className="hover-show">
          <InfoIcon sx={{marginLeft: '6px', fontSize: 16}} />
        </span>
        <span className="hover-hide">
          <InfoOutlinedIcon
            sx={{marginLeft: '6px', fontSize: 16}}
            className="info-gray-outlined-icon"
          />
        </span>
      </div>
    </Tooltip>
  );
}
