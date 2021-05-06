import React, { Fragment } from 'react'
import MusicManagement from 'Components/MusicManagement'

document.title = "Home"

const MusicPage = (props) => {
  return (
    <Fragment>
      <div style={{ margin: 'auto', width: '90%' }}>
        <MusicManagement {...props} />
      </div>
    </Fragment>
  )
}

export default MusicPage