import React, { Fragment, useState, useEffect } from 'react'
import { Avatar, Button, Grid, TextField } from '@material-ui/core'
import MusicTable from 'Components/MusicTable'
import { developDBRef, writeDeveloperData } from 'RealtimeDatabase/Develops'

const Develops = (props) => {
  const {
    user,
    signOut
  } = props

  const [listDev, setListDev] = useState([])

  useEffect(() => {
    if (listDev.length === 0) {
      developDBRef.get().then(function (snapshot) {
        if (snapshot.exists()) {
          setListDev(snapshot.val() || [])
        }
      }).catch(function (error) {
        console.error(error);
      });
    }
  }, [listDev])

  const getUserData = () => {
    developDBRef.on("value", (snapshot) => {
      if (listDev?.length !== snapshot.val()?.length) {
        setListDev(snapshot.val() || [])
      }
    });
  };

  useEffect(() => {
    getUserData()
  })

  const handleCreate = () => {
    writeDeveloperData('Nguyễn Văn Tài', 24)
  }

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
      <MusicTable data={listDev} />
      <div style={{ display: 'flex' }}>
        <TextField
          name="name"
          variant="outlined"
          size="small"
        />
        <TextField
          name="age"
          variant="outlined"
          size="small"
        />
        <button onClick={handleCreate}>Create</button>
      </div>
    </Fragment>
  )
}

export default Develops