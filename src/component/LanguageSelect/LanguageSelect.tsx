import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import FrenchIcon from '../../assets/SVG/French.svg';
import EnglishIcon from '../../assets/SVG/English.svg';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import {useState, MouseEvent} from 'react';
import './LanguageSelect.scss';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
function LanguageSelect() {
  //   Styles for list
  const sxProp = {
    bgcolor: 'background.paper',
    width: 200,
    p: 0.5,
    borderRadius: 6,
    ['.language-select-btn.MuiListItemButton-root']: {
      color: 'rgba(52, 71, 103, 1)',
      px: 1,
      py: 1,
      borderRadius: 10,
      ['.MuiListItemText-primary']: {
        fontWeight: 500,
        fontSize: 17,
      },
    },
  };
  const [open, setOpen] = useState(false); //state to toggle dropdown menu
  const [selectedLanguage, setSelectedLanguage] = useState('ENGLISH');

  // Function to handle language change
  const handleClick = () => {
    setSelectedLanguage(language => {
      return language === 'ENGLISH' ? 'FRENCH' : 'ENGLISH';
    });
    //ADD LANGUAGE CHANGE LOGIC HERE OR WE CAN ADD IT IN USE EFFECT
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
          {selectedLanguage === 'ENGLISH' ? (
            <EnglishButton />
          ) : (
            <FrenchButton />
          )}

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
              {selectedLanguage !== 'ENGLISH' ? (
                <EnglishButton />
              ) : (
                <FrenchButton />
              )}
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
