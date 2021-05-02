import React, { Fragment } from 'react'
import { providers, firebaseAppAuth } from 'firebaseConfig'
import withFirebaseAuth from 'react-with-firebase-auth'
import 'firebase/auth'
import SignIn from 'Components/SignIn'
import Develops from 'Components/Develops'
import Language from 'Components/Language'

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
    </Fragment>
  )
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App)