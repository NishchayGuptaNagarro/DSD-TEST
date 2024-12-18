import {Typography} from '@mui/material';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';

import {useFormik} from 'formik';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';

import {api} from 'api/api.ts';
import logo from 'assets/PNG/NagarroLogoWhite.png';
import LanguageSelect from 'component/LanguageSelect/LanguageSelect.tsx';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';
import {isTokenValid} from 'utilities/isTokenValid.ts';
import bgImage from '../../assets/WEBP/LoginBackground.webp';
import {EMAIL_REGEX} from '../../utilities/regex.ts';
import './ForgotPassword.scss';

function ForgotPassword() {
  const navigator = useNavigate();
  const {t} = useTranslation();
  const user = localStorage.getItem('user');
  async function submitEmail(email: string) {
    try {
      const response = await api.post('accounts/forgot-password', {
        identifier: email,
      });
      console.log(response);
      navigator('/home');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (user && isTokenValid(user)) {
      navigator('/home');
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(EMAIL_REGEX, t('forgotPassword.email.error'))
        .required('*Required'),
    }),
    onSubmit: async values => {
      await submitEmail(values.email);
    },
  });

  const emailError = formik.touched.email && formik.errors.email;
  const submitDisabled =
    formik.values.email === '' || formik.errors.email !== undefined;

  if (user && isTokenValid(user)) {
    return null;
  } else {
    return (
      <div className={'forgot-password-root'}>
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
            {t('forgotPassword.title')}
          </Typography>

          {/*----------------------------------------forgot password form--------------------------------------------------*/}
          <form
            className={'forgot-password-form'}
            onSubmit={formik.handleSubmit}>
            <label
              className={`form-label font-md `}
              htmlFor="forgot-password-form-email">
              {t('forgotPassword.email.label')}
            </label>
            <input
              id="forgot-password-form-email"
              className={`form-input font-sm  ${emailError ? 'form-input-error' : ''} `}
              type="text"
              name="email"
              placeholder={t('forgotPassword.input.placeholder')}
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
            <Button
              type={'submit'}
              variant="contained"
              disabled={submitDisabled}
              sx={{mt: 2, py: 1.5, borderRadius: 2}}
              disableElevation>
              {t('forgotPassword.button.label')}
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;

