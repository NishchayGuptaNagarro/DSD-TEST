import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import './Login.scss';
import logo from '../../assets/Logo.svg';
import {Typography} from '@mui/material';
import Button from '@mui/material/Button';
import {ChangeEvent, FormEvent, useState} from 'react';
function Login() {
  // TODO replace a tag with LINK when routing is added
  // TODO add css for error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckBox] = useState(false);

  function handleEmail(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }
  function handlePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }
  function handleCheckbox(event: ChangeEvent<HTMLInputElement>) {
    setCheckBox(event.target.checked);
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); //to prevent page refresh
    console.log(email, password, checkbox);
  }
  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid item xs={8}>
          <Stack padding={8} spacing={3}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}>
              <img src={logo} width={'40px'} height={'40px'} alt={logo} />
              <Typography
                className={'font-xl'}
                component={'h1'}
                color={'rgb(52,52,57)'}
                fontWeight={700}>
                NotionEdge
              </Typography>
            </Stack>
            <Box textAlign={'center'}>
              <Typography
                className={'font-xl'}
                component={'h2'}
                color={'rgb(43,56,84)'}
                fontWeight={700}>
                Login to Your Account
              </Typography>
              <Typography
                className={'font-lg'}
                component={'h3'}
                color={'rgb(146,155,173)'}
                fontWeight={400}>
                Please enter your details
              </Typography>
            </Box>
            {/*----------------------------------------login form--------------------------------------------------*/}
            <form className={'login-form'} onSubmit={handleSubmit}>
              <label
                className={'form-label font-md'}
                htmlFor="login-form-email">
                User ID
              </label>
              <input
                id="login-form-email"
                className={'form-input font-sm'}
                type={'text'}
                value={email}
                onChange={handleEmail}
              />
              <label
                className={'form-label font-md'}
                htmlFor="login-form-password">
                Password
              </label>
              <input
                id="login-form-password"
                className={'form-input font-sm'}
                type={'password'}
                value={password}
                onChange={handlePassword}
              />
              <Stack direction={'row'} justifyContent="space-between">
                <span>
                  <input
                    id="login-form-checkbox"
                    className={'form-checkbox'}
                    type="checkbox"
                    checked={checkbox}
                    onChange={handleCheckbox}
                  />
                  <label
                    className={'font-md form-checkbox-label'}
                    htmlFor="login-form-checkbox">
                    Remember me
                  </label>
                </span>
                <a className={'form-label font-md form-link'} href={'#'}>
                  Forgot password
                </a>
              </Stack>
              <Button
                className={'font-md'}
                type={'submit'}
                variant="contained"
                sx={{mt: 2, py: 1}}
                disableElevation>
                Sign in
              </Button>
            </form>
          </Stack>
        </Grid>
        <Grid item xs={4} p={2} height={'100vh'}>
          <Box
            sx={{
              height: '100%',
              overflow: 'hidden',
              borderRadius: 2,
              position: 'relative',
            }}>
            <img className={'truck-image'} src="/truck.jpg" alt={'truck'} />
            {/*This textbox can be further improved if it is decided to be kept in final code*/}
            <div className={'transparent-textbox'}>
              &#34; Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Atque, quis? &#34;
              <br />
              <br />
              Thomas Edison
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
