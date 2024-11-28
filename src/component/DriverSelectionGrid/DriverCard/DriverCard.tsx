import {Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Person from 'assets/SVG/Person.svg';
import RightArrowBlue from 'assets/SVG/RightArrowBlue.svg';
import styles from 'styles/design-systems.module.scss';
import './DriverCard.scss';
import {DriverCardProps} from './propTypes/types.ts';

function DriverCard({driver, handleDriverSelection}: DriverCardProps) {
  return (
    <Stack data-testid={'driver-btn'}>
      <Card
        variant={'outlined'}
        sx={{
          borderRadius: '8px',
        }}>
        <CardActionArea
          onClick={() => handleDriverSelection(driver.driverId)}
          sx={{cursor: 'pointer', height: '100%', width: '100%'}}>
          <CardContent sx={{height: '100%', width: '100%'}}>
            <Stack
              alignItems="center"
              direction="row"
              spacing={1}
              height={'100%'}
              sx={{
                py: {
                  sm: 1,
                  md: 1,
                  lg: 1.4,
                },
                px: {
                  sm: 0.4,
                  md: 0,
                  lg: '2%',
                },
                position: 'relative',
              }}>
              {/*Avatar component displays image in a circular icon*/}
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  flexBasis: '70%',
                  marginRight: '2px',
                  border: '1px solid red',
                }}>
                <Avatar
                  sx={{
                    width: 45,
                    height: 45,
                    bgcolor: styles.bgSoftAqua,
                  }}>
                  <img src={Person} alt="no-image-present"></img>
                </Avatar>
                <Box sx={{border: '1px solid green', maxWidth: '100%'}}>
                  <Typography
                    fontSize={styles.fontSizeMd}
                    color={styles.charcoalDark}
                    fontWeight={styles.fontWeightBolder}
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%',
                    }}>
                    {`${driver.driverName} Smith John`}
                  </Typography>
                  <Typography
                    fontSize={styles.fontSizeXsm}
                    color={styles.grayCharcoal}
                    fontWeight={styles.fontWeightLight}>
                    {driver.driverId}
                  </Typography>
                </Box>
              </Stack>
              <div className={'right-icon-container'}>
                <Avatar
                  sx={{
                    width: 25,
                    height: 25,
                    bgcolor: styles.bgSoftBabyBlue,
                  }}>
                  <img
                    className="right-icon"
                    data-testid={'icon'}
                    src={RightArrowBlue}
                    alt={'icon'}
                  />
                </Avatar>
              </div>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Stack>
  );
}

export default DriverCard;

