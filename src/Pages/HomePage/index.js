import React, { Fragment } from 'react'
import Develops from 'Components/Develops'

document.title = "Home"

const HomePage = (props) => {
  return (
    <Fragment>
      <Develops {...props} />
    </Fragment>
  )
}

export default HomePage