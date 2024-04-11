import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {Typography} from '@mui/material';
import Button from '@mui/material/Button';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Link, useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import {AxiosResponse} from 'axios';
import {useEffect, useState} from 'react';

import LanguageSelect from '../../component/LanguageSelect/LanguageSelect.tsx';
import {api} from '../../axios/api';
import {LoginApiResponse} from './propTypes/types.ts';
import './Login.scss';
import logo from '../../assets/Logo.svg';

function Login() {
  // TODO add api call at finish
  // TODO not able to move to next step unless a driver is selected
  // TODO add signout
  // TODO add create loading order link in sidebar

  const [apiError, setApiError] = useState('');
  const navigator = useNavigate();

  async function authenticateUser(values: {
    userId: string;
    password: string;
    checkbox: boolean;
  }) {
    console.log(values);
    try {
      const res: AxiosResponse<LoginApiResponse> = await api.post(
        'accounts/login',
        {
          email: values.userId,
          password: values.password,
        },
      );
      const responseData = res.data;
      if (responseData.status_code == 200 && responseData.data) {
        localStorage.setItem('access_token', responseData.data.access_token);
        const user = jwtDecode(responseData.data.access_token);

        localStorage.setItem('user', JSON.stringify(user));
        navigator('/availablestock');
      } else {
        throw new Error(responseData.msg);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setApiError(error.message);
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigator('/availablestock');
    }
  }, []);

  // Using formik and yup to handle form states, validation and submission
  // we can add more validations in validation schema as per requirement
  const formik = useFormik({
    initialValues: {
      userId: '',
      password: '',
      checkbox: false,
    },
    validationSchema: Yup.object({
      userId: Yup.string().email('Enter a valid email').required('*Required'),
      password: Yup.string().required('*Required'),
    }),
    onSubmit: async values => {
      await authenticateUser(values);
    },
  });

  const userIdError = formik.touched.userId && formik.errors.userId;
  const passwordError = formik.touched.password && formik.errors.password;

  if (localStorage.getItem('access_token')) {
    return null;
  } else {
    return (
      <>
        <Grid container sx={{backgroundColor: 'white'}}>
          <Grid item xs={6}>
            {/*Parent Stack containing Heading + Form heading + form */}
            <Stack padding={6.4} spacing={3}>
              {/*Stack Containing Heading + Logo*/}
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
              <Box textAlign={'center'} paddingTop={{xl: 8}}>
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
              <form className={'login-form '} onSubmit={formik.handleSubmit}>
                <label
                  className={`form-label font-md  ${userIdError ? 'form-label-error' : ''}`}
                  htmlFor="login-form-email">
                  User ID
                </label>
                <input
                  id="login-form-email"
                  className={`form-input font-sm  ${userIdError ? 'form-input-error' : ''} `}
                  type="text"
                  name="userId"
                  value={formik.values.userId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/*Error message -> To be displayed in case inputs are touched and there is error*/}
                {userIdError && (
                  <Typography
                    color={'error'}
                    marginTop={-2}
                    className={'font-xsm'}>
                    {formik.errors.userId}
                  </Typography>
                )}
                <label
                  className={`form-label font-md  ${passwordError ? 'form-label-error' : ''}`}
                  htmlFor="login-form-password">
                  Password
                </label>

                <input
                  id="login-form-password"
                  className={`form-input font-sm  ${passwordError ? 'form-input-error' : ''}`}
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {passwordError && (
                  <Typography
                    marginTop={-2}
                    color={'error'}
                    className={'font-xsm'}>
                    {formik.errors.password}
                  </Typography>
                )}
                {apiError !== '' && (
                  <Typography
                    color={'error'}
                    marginTop={-2}
                    className={'font-xsm'}>
                    {apiError}
                  </Typography>
                )}
                <Stack direction={'row'} justifyContent="space-between">
                  <span>
                    <input
                      id="login-form-checkbox"
                      className={'form-checkbox'}
                      type="checkbox"
                      name="checkbox"
                      checked={formik.values.checkbox}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className={'font-md form-checkbox-label'}
                      htmlFor="login-form-checkbox">
                      Remember me
                    </label>
                  </span>
                  <Link
                    className={'form-label font-md form-link'}
                    to={'/forgotpassword'}>
                    Forgot password
                  </Link>
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
          <Grid item xs={6} p={2} height={'100vh'}>
            <Box
              sx={{
                height: '100%',
                overflow: 'hidden',
                borderRadius: 2,
                position: 'relative',
              }}>
              <span className={'login-language-select'}>
                <LanguageSelect />
              </span>
              <img className={'truck-image'} src="/truck.jpg" alt={'truck'} />
              <div className={'transparent-textbox'}>
                &#34;Opportunity is missed by most people because it is dressed
                in overalls and looks like work.&#34;
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
}

export default Login;
