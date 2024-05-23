import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {Typography} from '@mui/material';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Link, useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import {AxiosResponse} from 'axios';
import {useEffect, useState} from 'react';

import LanguageSelect from 'component/LanguageSelect/LanguageSelect.tsx';
import {api} from 'axios/api';
import {LoginApiResponse} from './propTypes/types.ts';
import './Login.scss';
import banner from 'assets/WEBP/Login-Page-Banner.webp';
import logo from 'assets/SVG/NagarroLight.svg';
import {useTranslation} from 'react-i18next';
import {isTokenValid} from 'utilities/isTokenValid.ts';
import {checkApiError} from 'utilities/checkApiError.ts';
import styles from 'styles/design-systems.module.scss';

function Login() {
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigator = useNavigate();
  const {t} = useTranslation();
  const user = localStorage.getItem('user');
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
          email_or_username: values.userId,
          password: values.password,
        },
      );
      checkApiError(res);
      const responseData = res.data;

      localStorage.setItem('access_token', responseData.data.access_token);
      const user = jwtDecode(responseData.data.access_token);

      localStorage.setItem('user', JSON.stringify(user));
      navigator('/home');
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setApiError(error.message);
      }
    }
  }

  useEffect(() => {
    if (user && isTokenValid(user)) {
      navigator('/home');
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
      userId: Yup.string().required('*Required'),
      password: Yup.string().required('*Required'),
    }),
    onSubmit: async values => {
      await authenticateUser(values);
    },
  });

  const userIdError = formik.touched.userId && formik.errors.userId;
  const passwordError = formik.touched.password && formik.errors.password;

  if (user && isTokenValid(user)) {
    return null;
  } else {
    return (
      <>
        <Grid container sx={{backgroundColor: styles.whitePure}}>
          <Grid item xs={6}>
            {/*Parent Stack containing Heading + Form heading + form */}
            <Stack padding={6.4} spacing={3}>
              {/*Stack Containing Heading + Logo*/}
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                <img src={logo} height={'40px'} alt={logo} />
              </Stack>
              <Box textAlign={'center'} paddingTop={{xl: 8}}>
                <Typography
                  fontSize={styles.fontSizeXl}
                  component={'h2'}
                  color={styles.indigoDeep}
                  fontWeight={styles.fontWeightBold}>
                  {t('login.title')}
                </Typography>
                <Typography
                  fontSize={styles.fontSizeLg}
                  component={'h3'}
                  color={styles.greySoft}
                  fontWeight={styles.fontWeightLight}>
                  {t('login.subtitle')}
                </Typography>
              </Box>
              {/*----------------------------------------login form--------------------------------------------------*/}
              <form className={'login-form '} onSubmit={formik.handleSubmit}>
                <label
                  className={`form-label font-md  ${userIdError ? 'form-label-error' : ''}`}
                  htmlFor="login-form-email">
                  {t('login.userId.label')}
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
                    color={styles.redError}
                    marginTop={-2}
                    fontSize={styles.fontSizeXsm}>
                    {formik.errors.userId}
                  </Typography>
                )}
                <label
                  className={`form-label font-md  ${passwordError ? 'form-label-error' : ''}`}
                  htmlFor="login-form-password">
                  {t('login.password.label')}
                </label>
                <div className={'password-input-container'}>
                  <input
                    id="login-form-password"
                    className={`form-input font-sm  ${passwordError ? 'form-input-error' : ''}`}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {showPassword ? (
                    <IconButton
                      onClick={() => {
                        setShowPassword(false);
                      }}
                      className={'eye-icon'}>
                      <VisibilityOff fontSize={'small'} />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => {
                        setShowPassword(true);
                      }}
                      className={'eye-icon'}>
                      <Visibility fontSize={'small'} />
                    </IconButton>
                  )}
                </div>

                {/*<VisibilityOff fontSize={'small'} />*/}
                {passwordError && (
                  <Typography
                    marginTop={-2}
                    color={styles.redError}
                    fontSize={styles.fontSizeXsm}>
                    {formik.errors.password}
                  </Typography>
                )}
                {apiError !== '' && (
                  <Typography
                    color={styles.redError}
                    marginTop={-2}
                    fontSize={styles.fontSizeXsm}>
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
                      {t('login.checkbox.label')}
                    </label>
                  </span>
                  <Link
                    className={'form-label font-md form-link'}
                    to={'/forgotpassword'}>
                    {t('login.forgotPassword.label')}
                  </Link>
                </Stack>
                <Button
                  className={'font-md'}
                  type={'submit'}
                  variant="contained"
                  sx={{mt: 2, py: 1}}
                  disableElevation>
                  {t('login.button.label')}
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
              <img className={'responsive-image'} src={banner} alt={'truck'} />
              <div className={'transparent-textbox'}>
                &#34;{t('login.quote')}&#34;
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
