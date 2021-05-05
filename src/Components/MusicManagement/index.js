import React, { Fragment, useState, useEffect } from 'react'
import { Avatar, Button, Grid } from '@material-ui/core'
import MusicTable from 'Components/MusicTable'
import { developDBRef } from 'RealtimeDatabase/Musics'

const MusicManagement = (props) => {
  const {
    user,
    signOut
  } = props

  const [listMusic, setListDev] = useState([])

  useEffect(() => {
    if (listMusic.length === 0) {
      developDBRef.get().then(function (snapshot) {
        if (snapshot.exists()) {
          setListDev(snapshot.val() || [])
        }
      }).catch(function (error) {
        console.error(error);
      });
    }
  }, [listMusic])

  const getUserData = () => {
    developDBRef.on("value", (snapshot) => {
      if (listMusic?.length !== snapshot.val()?.length) {
        setListDev(snapshot.val() || [])
      }
    });
  };

  useEffect(() => {
    getUserData()
  })

  return (
    <Fragment>
      <Grid container justify="space-between" style={{ marginBottom: '1em' }}>
        <Grid item xs={11}>
          <Avatar alt="My Avatar" src={`${user?.photoURL}`} style={{ width: '4em', height: '4em' }} />
        </Grid>
        <Grid item xs={1} style={{ margin: 'auto' }}>
          <Button
            onClick={signOut}
            variant="outlined"
            color="primary"
          >
            Sign out
          </Button>
        </Grid>
      </Grid>
      <MusicTable data={listMusic} />
    </Fragment>
  )
}

export default MusicManagement