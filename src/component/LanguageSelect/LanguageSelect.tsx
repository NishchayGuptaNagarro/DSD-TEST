import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

import FrenchIcon from '../../assets/SVG/French.svg';
import EnglishIcon from '../../assets/SVG/English.svg';
import './LanguageSelect.scss';

import {useState, MouseEvent} from 'react';
import {useTranslation} from 'react-i18next';

function LanguageSelect() {
  //   Styles for list
  const sxProp = {
    bgcolor: 'background.paper',
    width: 180,
    p: 0.5,
    borderRadius: 6,
    ['.language-select-btn.MuiListItemButton-root']: {
      color: 'rgba(52, 71, 103, 1)',
      px: 0.5,
      py: 0.5,
      borderRadius: 10,
      ['.MuiListItemText-primary']: {
        fontWeight: 500,
        fontSize: 15,
      },
    },
  };
  const {
    i18n: {changeLanguage, language},
  } = useTranslation();
  const [open, setOpen] = useState(false); //state to toggle dropdown menu
  const [currentLanguage, setCurrentLanguage] = useState(language);

  // Function to handle language change
  const handleClick = () => {
    const newLanguage = currentLanguage === 'en' ? 'fr' : 'en';
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  // Function to hide and show dropdown
  function handleToggle(
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) {
    event.stopPropagation();
    setOpen(!open);
  }

  return (
    <>
      <List className={'language-select'} sx={sxProp}>
        <ListItemButton className={'language-select-btn'} onClick={handleClick}>
          {currentLanguage === 'en' ? <EnglishButton /> : <FrenchButton />}

          <Button
            disableFocusRipple
            disableTouchRipple
            disableRipple
            disableElevation
            sx={{
              p: 0,
              minWidth: '10px',
              color: 'rgba(52, 71, 103, 1)',
              ['&:hover']: {
                background: 'transparent',
              },
            }}
            onClick={handleToggle}>
            {open ? <ExpandLess sx={{zIndex: 1}} /> : <ExpandMore />}
          </Button>
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              className={'language-select-btn'}
              onClick={handleClick}>
              {currentLanguage !== 'en' ? <EnglishButton /> : <FrenchButton />}
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </>
  );
}

export default LanguageSelect;

// Buttons for French and English language
function FrenchButton() {
  return (
    <>
      <ListItemIcon>
        <Avatar
          alt="french"
          src={FrenchIcon}
          sx={{
            width: 30,
            height: 30,
          }}
        />
      </ListItemIcon>
      <ListItemText className={'.language-select-text'} primary="French" />
    </>
  );
}
function EnglishButton() {
  return (
    <>
      <ListItemIcon>
        <Avatar
          src={EnglishIcon}
          sx={{
            width: 30,
            height: 30,
          }}
        />
      </ListItemIcon>
      <ListItemText primary="English" />
    </>
  );
}
