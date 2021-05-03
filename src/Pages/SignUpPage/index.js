import React, { Fragment } from 'react'
import SignUp from 'Components/SignUp'

document.title = "Sign Up"

const SignUpPage = (props) => {
  return (
    <Fragment>
      <SignUp {...props} />
    </Fragment>
  )
}

export default SignUpPage