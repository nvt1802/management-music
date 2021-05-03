import React, { Fragment } from 'react'
import SignIn from 'Components/SignIn'

document.title = "Sign In"

const SignInPage = (props) => {
  return (
    <Fragment>
      <SignIn {...props} />
    </Fragment>
  )
}

export default SignInPage