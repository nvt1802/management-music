import React from 'react'
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { providers, firebaseAppAuth } from 'firebaseConfig'
import withFirebaseAuth from 'react-with-firebase-auth'
import 'firebase/auth'
import routes, { RouteWithSubRoutes } from './Routes'
import Language from 'Components/Language'
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core'

function App(props) {
  const classes = useStyles();
  const { user } = props

  if (typeof (user) !== 'undefined') {
    return (
      <Router>
        <Language />
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} {...props} />
          ))}
        </Switch >
      </Router >
    );
  } else {
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App)
