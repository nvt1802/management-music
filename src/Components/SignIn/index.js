import React, { useState } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Divider
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Visibility, VisibilityOff, Person, LockRounded } from '@material-ui/icons'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { useTranslation } from 'react-i18next'

const SignIn = (props) => {
  const {
    user,
    signInWithGoogle,
  } = props
  const classes = useStyles()
  const { t } = useTranslation(['signin', 'common'])
  const [showPassword, setShowPassword] = useState(false)
  const [focusEmail, setFocusEmail] = useState(false)
  const [focusPassword, setFocusPassword] = useState(false)

  const schema = yup.object().shape({
    email: yup.string()
      .required(t('common:validate.message_require', { field: 'Email' }))
      .email(t('common:validate.email_format')),
    password: yup.string().required(t('common:validate.message_require', { field: 'Password' })),
  });
  const { handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema)
  });

  const handleLoginWithGoogle = (event) => {
    event.preventDefault()
    signInWithGoogle()
  }

  const handleLoginWithFacebook = (event) => {
    event.preventDefault()

  }

  // const handleCreateAccount = () => {
  //   firebase.auth().createUserWithEmailAndPassword('tainguyen180297@gmail.com', 'Vinhsang1802').then((userCredential) => {
  //     console.log(userCredential)
  //   }).catch((error) => {
  //     console.log(error?.message)
  //   });
  // }

  const onSubmit = data => {
    firebase.auth().signInWithEmailAndPassword(data?.email, data?.password)
      .then((res) => console.log(res))
      .catch(error => {
        console.log(error?.message)
        console.log({ user })
      })
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.main}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('signin:title')}
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
            {t('signin:btn_sign_in')}
          </Button>
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
              <Link href="#" variant="body2">
                {t('signin:lbl_forgot_password')}
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {t('signin:lbl_sign_up')}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
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
    margin: theme.spacing(1),
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
  }
}))

export default SignIn