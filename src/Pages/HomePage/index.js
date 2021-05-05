import React, { Fragment } from 'react'
import MusicManagement from 'Components/MusicManagement'

document.title = "Home"

const HomePage = (props) => {
  return (
    <Fragment>
      <div style={{ margin: 'auto', width: '90%' }}>
        <MusicManagement {...props} />
      </div>
    </Fragment>
  )
}

export default HomePage