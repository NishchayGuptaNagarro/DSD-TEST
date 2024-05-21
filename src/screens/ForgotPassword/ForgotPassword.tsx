import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

import LanguageSelect from 'component/LanguageSelect/LanguageSelect.tsx';
import {api} from 'axios/api.ts';
import './ForgotPassword.scss';
import logo from 'assets/SVG/NagarroLight.svg';
import banner from 'assets/WEBP/ForgotPassword-Banner.webp';
import {useTranslation} from 'react-i18next';
import {isTokenValid} from 'utilities/isTokenValid.ts';
import {checkApiError} from 'utilities/checkApiError.ts';
import styles from 'styles/design-systems.module.scss';

function ForgotPassword() {
  const [apiResponse, setApiResponse] = useState('');
  const navigator = useNavigate();
  const {t} = useTranslation();
  const user = localStorage.getItem('user');
  async function submitEmail(email: string) {
    try {
      const response = await api.post('accounts/forgot-password', {
        identifier: email,
      });
      checkApiError(response);
      setApiResponse(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user && isTokenValid(user)) {
      navigator('/availablestock');
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('forgotPassword.email.error'))
        .required('*Required'),
    }),
    onSubmit: async values => {
      await submitEmail(values.email);
    },
  });

  const emailError = formik.touched.email && formik.errors.email;

  if (user && isTokenValid(user)) {
    return null;
  } else {
    return (
      <Grid
        container
        justifyContent="space-between"
        sx={{backgroundColor: styles.whitePure}}>
        <Grid item xs={6}>
          {/*Parent Stack containing Heading + Form heading + form */}
          <Stack
            paddingY={8}
            paddingLeft={{xs: 16, xl: 24}}
            spacing={{xs: 3, xl: 3}}>
            {/*Stack Containing Heading + Logo*/}
            <Stack direction="row" alignItems="center" spacing={2}>
              <img src={logo} height={'40px'} alt={logo} />
            </Stack>
            <Box paddingTop={{xl: 4}}>
              <Typography
                fontSize={styles.fontSizeXl}
                component={'h2'}
                color={styles.indigoDeep}
                fontWeight={styles.fontWeightBold}>
                {t('forgotPassword.title')}
              </Typography>
              <Typography
                fontSize={styles.fontSizeLg}
                component={'h3'}
                color={styles.greySoft}
                fontWeight={styles.fontWeightLight}>
                {t('forgotPassword.description')}
              </Typography>
            </Box>
            {/*----------------------------------------forgot password form--------------------------------------------------*/}
            <form
              className={'forgot-password-form'}
              onSubmit={formik.handleSubmit}>
              <label
                className={`form-label font-md  ${emailError ? 'form-label-error' : ''}`}
                htmlFor="forgot-password-form-email">
                {t('forgotPassword.email.label')}
              </label>
              <input
                id="forgot-password-form-email"
                className={`form-input font-sm  ${emailError ? 'form-input-error' : ''} `}
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {/*Error message -> To be displayed in case inputs are touched and there is error*/}
              {emailError && (
                <Typography
                  color={styles.redError}
                  marginTop={-2}
                  fontSize={styles.fontSizeXsm}>
                  {formik.errors.email}
                </Typography>
              )}
              {apiResponse !== '' && (
                <Typography
                  fontSize={styles.fontSizeXsm}
                  color={styles.indigoDeep}
                  fontWeight={styles.fontWeightBolder}>
                  {apiResponse}
                </Typography>
              )}

              <Button
                type={'submit'}
                variant="contained"
                sx={{mt: 2, py: 1}}
                disableElevation>
                {t('forgotPassword.button.label')}
              </Button>
              <Link className={'form-label form-link'} to={'/'}>
                <ArrowBackIcon fontSize={'small'} sx={{marginRight: 2}} />
                {t('forgotPassword.link.label')}
              </Link>
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
              &#34;{t('forgotPassword.quote')}&#34;
              <br />
              <br />
              Thomas Edison
            </div>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

export default ForgotPassword;
