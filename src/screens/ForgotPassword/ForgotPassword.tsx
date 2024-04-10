import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import logo from '../../assets/Logo.svg';
import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import './ForgotPassword.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link} from 'react-router-dom';
import {api} from '../../axios/api.ts';
import {useState} from 'react';
function ForgotPassword() {
  const [apiResponse, setApiResponse] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Enter a valid email').required('*Required'),
    }),
    onSubmit: async values => {
      console.log(values);
      try {
        const response = await api.post('accounts/forgot-password', {
          identifier: values.email,
        });
        setApiResponse(response.data.msg);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const emailError = formik.touched.email && formik.errors.email;
  return (
    <Grid
      container
      justifyContent="space-between"
      sx={{backgroundColor: 'white'}}>
      <Grid item xs={6}>
        {/*Parent Stack containing Heading + Form heading + form */}
        <Stack
          paddingY={8}
          paddingLeft={{xs: 16, xl: 24}}
          spacing={{xs: 3, xl: 3}}>
          {/*Stack Containing Heading + Logo*/}
          <Stack direction="row" alignItems="center" spacing={2}>
            <img src={logo} width={'40px'} height={'40px'} alt={logo} />
            <Typography
              className={'font-xl'}
              component={'h1'}
              color={'rgb(52,52,57)'}
              fontWeight={700}>
              NotionEdge
            </Typography>
          </Stack>
          <Box paddingTop={{xl: 4}}>
            <Typography
              className={'font-xl'}
              component={'h2'}
              color={'rgb(43,56,84)'}
              fontWeight={700}>
              Forgot Password ?
            </Typography>
            <Typography
              className={'font-lg'}
              component={'h3'}
              color={'rgb(146,155,173)'}
              fontWeight={400}>
              No worries, we&apos;ll send you reset instructions.
            </Typography>
          </Box>
          {/*----------------------------------------forgot password form--------------------------------------------------*/}
          <form
            className={'forgot-password-form'}
            onSubmit={formik.handleSubmit}>
            <label
              className={`form-label font-md  ${emailError ? 'form-label-error' : ''}`}
              htmlFor="forgot-password-form-email">
              Enter your email
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
              <Typography color={'error'} marginTop={-2} className={'font-xsm'}>
                {formik.errors.email}
              </Typography>
            )}
            {apiResponse !== '' && (
              <Typography
                className={'font-xsm'}
                color={'rgb(43,56,84)'}
                fontWeight={600}>
                {apiResponse}
              </Typography>
            )}

            <Button
              className={'font-md'}
              type={'submit'}
              variant="contained"
              sx={{mt: 2, py: 1}}
              disableElevation>
              Reset password
            </Button>
            <Link className={'form-label font-md form-link'} to={'/'}>
              <ArrowBackIcon fontSize={'small'} sx={{marginRight: 2}} />
              Back to login
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
          <img className={'truck-image'} src="/truck-2.jpg" alt={'truck'} />
          {/*This textbox can be further improved if it is decided to be kept in final code*/}
          <div className={'transparent-textbox'}>
            &#34; Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Atque, quis?&#34;
            <br />
            <br />
            Thomas Edison
          </div>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ForgotPassword;
