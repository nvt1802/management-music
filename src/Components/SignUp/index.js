import React, { useState } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Divider,
  FormHelperText,
  Snackbar
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AvatarImage from 'Assets/Avatar/avatar.png'
import { Visibility, VisibilityOff, Person, LockRounded } from '@material-ui/icons'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Alert } from '@material-ui/lab'
import ForgotPassowd from 'Components/ForgotPassowd'

const SignUp = (props) => {
  const {
    // user,
    signOut,
    signInWithGoogle,
  } = props
  const classes = useStyles()
  const { t } = useTranslation(['signup', 'common'])
  const [showPassword, setShowPassword] = useState(false)
  const [focusEmail, setFocusEmail] = useState(false)
  const [focusPassword, setFocusPassword] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const schema = yup.object().shape({
    email: yup.string()
      .required(t('common:validate.message_require', { field: 'Email' }))
      .email(t('common:validate.email_format')),
    password: yup.string()
      .required(t('common:validate.message_require', { field: 'Password' }))
      .min(6, t('common:validate.password_length'))
  });

  const { handleSubmit, formState: { errors }, control, setError } = useForm({
    resolver: yupResolver(schema)
  });

  const handleLoginWithGoogle = (event) => {
    event.preventDefault()
    signInWithGoogle()
  }

  const handleLoginWithFacebook = (event) => {
    event.preventDefault()

  }

  const onSubmit = data => {
    firebase.auth().createUserWithEmailAndPassword(data?.email, data?.password).then((userCredential) => {
      setOpenAlert(true)
      signOut()
    }).catch((error) => {
      setError('errorAfterSubmit', {
        type: "manual",
        message: t(`signup:validate.${error?.code}`)
      });
    });
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.main}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src={AvatarImage}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('signup:title')}
        </Typography>
        <form className={classes.form} noValidate method="POST" onSubmit={handleSubmit(onSubmit)} >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField
              {...field}
              size="small"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email"
              type="email"
              autoComplete="off"
              error={errors.email ? true : false}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: !focusEmail ? null : <Person style={{ marginRight: '0.5em', width: '0.8em' }} />,
              }}
              onFocus={() => setFocusEmail(true)}
              onBlur={(event) => {
                if (!event.target.value) {
                  setFocusEmail(false)
                }
              }}
            />
            }
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField
              {...field}
              size="small"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              type={!showPassword ? 'password' : 'text'}
              autoComplete="off"
              error={errors.password ? true : false}
              helperText={errors.password?.message}
              InputProps={
                {
                  startAdornment: !focusPassword ? null : <LockRounded style={{ marginRight: '0.5em', width: '0.8em' }} />,
                  endAdornment: <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              }
              onFocus={() => setFocusPassword(true)}
              onBlur={(event) => {
                if (!event.target.value) {
                  setFocusPassword(false)
                }
              }}
            />
            }
          />
          <Button
            type="submit"
            fullWidth
            size="small"
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            {t('signup:btn_sign_in')}
          </Button>
          <FormHelperText error style={{ textAlign: 'center' }}>{errors?.errorAfterSubmit?.message}</FormHelperText>
          <Grid container>
            <Grid item xs={5} style={{ margin: 'auto' }} >
              <Divider />
            </Grid>
            <Grid item xs={2} style={{ textAlign: 'center' }}>
              OR
            </Grid>
            <Grid item xs={5} style={{ margin: 'auto' }} >
              <Divider />
            </Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item xs={5} style={{ marginRight: '1em' }}>
              <Button
                type="button"
                fullWidth
                size="small"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleLoginWithFacebook}
              >Facebook</Button>
            </Grid>
            <Grid item xs={5} >
              <Button
                type="button"
                fullWidth
                size="small"
                variant="contained"
                color="inherit"
                className={classes.submit}
                onClick={handleLoginWithGoogle}
              >Google</Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2" className={classes.link} onClick={() => setShowForgotPassword(true)}>
                {t('signup:lbl_forgot_password')}
              </Link>
            </Grid>
            <Grid item>
              <Link to="/SignIn" variant="body2" className={classes.link}>
                {t('signup:lbl_sign_up')}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
        <Alert onClose={() => setOpenAlert(false)} severity="success">
          {`${t('signup:lbl_sign_up_success')}, `}
          <Link to="/SignIn" variant="body2" className={classes.link}>
            {t('signup:lbl_login_now')}
          </Link>
        </Alert>
      </Snackbar>
      <ForgotPassowd status={showForgotPassword} setStatus={setShowForgotPassword} />
    </Container >
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    // margin: theme.spacing(1),
    top: '-20px',
    width: '120px',
    height: '120px',
    border: '1px solid',
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  main: {
    backgroundColor: 'honeydew',
    opacity: '0.85'
  },
  link: {
    textDecoration: 'none'
  }
}))

export default SignUp