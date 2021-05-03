import React, { Fragment } from 'react'
import { providers, firebaseAppAuth } from 'firebaseConfig'
import withFirebaseAuth from 'react-with-firebase-auth'
import 'firebase/auth'
import SignIn from 'Components/SignIn'
import Develops from 'Components/Develops'
import Language from 'Components/Language'
import { Box, Link, Typography } from '@material-ui/core'

function App(props) {
  const {
    user
  } = props

  return (
    <Fragment>
      <Language />
      {!user && <SignIn {...props} />}
      {user &&
        <Develops {...props} />
      }
      <Box mt={4} style={{ position: 'absolute', bottom: '1em', alignSelf: 'center' }}>
        <Copyright />
      </Box>
    </Fragment>
  )
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App)