import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import {Typography} from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import {AxiosResponse} from 'axios';
import {useFormik} from 'formik';
import {jwtDecode} from 'jwt-decode';
import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as Yup from 'yup';

import {api} from 'api/api.ts';
import logo from 'assets/PNG/NagarroLogoWhite.png';
import bgImage from 'assets/WEBP/LoginBackground.webp';
import LanguageSelect from 'component/LanguageSelect/LanguageSelect.tsx';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';
import {isTokenValid} from 'utilities/isTokenValid.ts';
import './Login.scss';
import {LoginApiResponse} from './propTypes/types.ts';
import { allowedRoles } from 'utilities/enums.ts';
import { userPayload } from './propTypes/types.ts';

function Login() {
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigator = useNavigate();
  const {t} = useTranslation();
  const user = localStorage.getItem('user');
  async function authenticateUser(values: {userId: string; password: string}) {
    console.log(values);
    try {
      const res: AxiosResponse<LoginApiResponse> = await api.post(
        'accounts/login',
        {
          email_or_username: values.userId,
          password: values.password,
        },
      );
      const responseData = res.data;

      localStorage.setItem('access_token', responseData.data.access_token);
      const user : userPayload = jwtDecode(responseData.data.access_token);

      const userRole = user.business_role_id
      if(userRole !== allowedRoles.WAREHOUSE_ADMIN){
        setApiError(t('login.invalidRole'));
        return;
      }

      localStorage.setItem('user', JSON.stringify(user));
      navigator('/home');
    } catch (error) {
      console.error(error);
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
  const loginDisabled =
    formik.values.password === '' || formik.values.userId === '';

  if (user && isTokenValid(user)) {
    return null;
  } else {
    return (
      <div className={'login-root'}>
        <img src={bgImage} className={'bg-image'} alt={'background'} />
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'flex-start'}
          px={4}
          py={2}>
          <img src={logo} className={'logo'} alt={'logo'} />
          <LanguageSelect />
        </Stack>
        <div className={'form-container'}>
          <Typography
            fontSize={styles.fontSizeXl}
            component={'h2'}
            mb={3}
            color={styles.charcoalDark}
            fontWeight={styles.fontWeightBolder}>
            {t('login.title')}
          </Typography>
          {/*----------------------------------------login form--------------------------------------------------*/}
          <form className={'login-form'} onSubmit={formik.handleSubmit}>
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
            <Stack direction={'row'} justifyContent={'space-between'} mt={1}>
              <label
                className={`form-label font-md  ${passwordError ? 'form-label-error' : ''}`}
                htmlFor="login-form-password">
                {t('login.password.label')}
              </label>
              <Link
                className={'form-label font-md form-link'}
                to={'/forgotpassword'}>
                {t('login.forgotPassword.label')}
              </Link>
            </Stack>
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
                  <VisibilityOffOutlinedIcon fontSize={'small'} />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    setShowPassword(true);
                  }}
                  className={'eye-icon'}>
                  <RemoveRedEyeOutlinedIcon fontSize={'small'} />
                </IconButton>
              )}
            </div>
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
                marginTop={-1}
                fontSize={styles.fontSizeXsm}>
                {apiError}
              </Typography>
            )}
            <Button
              className={'font-md'}
              type={'submit'}
              variant="contained"
              disabled={loginDisabled}
              sx={{mt: 2, py: 1.5, borderRadius: 2}}
              disableElevation>
              {t('login.button.label')}
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;

