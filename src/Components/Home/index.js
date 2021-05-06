import React, { Fragment, useState, useEffect } from 'react'
import { Avatar, Button, Grid } from '@material-ui/core'
import { developDBRef } from 'RealtimeDatabase/Musics'

const Home = (props) => {
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
        console.error(error)
      })
    }
  }, [listMusic])

  developDBRef.on("value", (snapshot) => {
    if (listMusic?.length !== snapshot.val()?.length) {
      setListDev(snapshot.val() || [])
    }
  })

  const renderListMusic = () => {
    return Object.keys(listMusic).map((row, index) => {
      return (
        <Grid item xs={4} key={index}>
          <iframe width={'300px'} height={'200px'} src={listMusic[row]?.UrlYoutube} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </Grid>
      )
    })
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
      <Grid container justify="space-between" style={{ marginBottom: '1em' }}>
        {renderListMusic()}
      </Grid>
    </Fragment>
  )
}

export default Home