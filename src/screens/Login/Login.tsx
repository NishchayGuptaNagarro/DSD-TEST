import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import './Login.scss';
import logo from '../../assets/Logo.svg';
import {Typography} from '@mui/material';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Link, useNavigate} from 'react-router-dom';

function Login() {
  // TODO improve transparent text box if it is decided to be included

  // Using formik and yup to handle form states, validation and submission
  // we can add more validations in validation schema as per requirement
  const navigator = useNavigate();

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
    onSubmit: values => {
      console.log(values);
      navigator('/');
    },
  });

  const userIdError = formik.touched.userId && formik.errors.userId;
  const passwordError = formik.touched.password && formik.errors.password;
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
            <img className={'truck-image'} src="/truck.jpg" alt={'truck'} />
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
    </>
  );
}

export default Login;
