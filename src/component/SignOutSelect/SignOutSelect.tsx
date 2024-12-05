import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogOut from 'assets/SVG/LogOut.svg';
import PersonGray from 'assets/SVG/PersonGray.svg';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import styles from 'styles/design-systems.module.scss';
import './SignOutSelect.scss';

export default function SignOutSelect() {
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const clearStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List component="nav">
      <ListItemButton
        onClick={handleClick}
        sx={{
          borderRadius: 10,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
        disableRipple>
        <ListItemIcon sx={{px: 0}}>
          <Avatar
            sx={{
              width: 44,
              height: 44,
              bgcolor: styles.bgGrayLightTransparent,
            }}>
            <img src={PersonGray} alt="no-image-present"></img>
          </Avatar>
        </ListItemIcon>
        {open ? <ExpandLess sx={{zIndex: 1}} /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="nav" disablePadding>
          <ListItemButton
            sx={{
              padding: '2px 20px 0 14px',
              borderRadius: '4px',
              marginTop: '4px',
              bgcolor: styles.whitePure,
              border: `1px solid ${styles.borderSoftGray}`,
              width: 'min-content',
              height: '40px',
              position: 'absolute',
              right: 0,
              left: 'auto',
              '&:hover': {
                backgroundColor: styles.bgColorWhiteSmoke,
              },
            }}
            onClick={clearStorage}>
            <ListItemIcon sx={{minWidth: 'min-content'}}>
              <img
                loading="eager"
                className={'logout-icon'}
                src={LogOut}
                alt={'signout'}
              />
            </ListItemIcon>
            <ListItemText
              sx={{
                color: styles.mediumGray,
                paddingLeft: '10px',
              }}
              primary={t('header.logout')}
            />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
