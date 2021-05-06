import React, { Fragment } from 'react'
import Home from 'Components/Home'

document.title = "Home"

const HomePage = (props) => {
  return (
    <Fragment>
      <Home {...props} />
    </Fragment>
  )
}

export default HomePage