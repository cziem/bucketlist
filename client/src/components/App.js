import React, { useContext } from 'react';
import '../styles/App.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import { Store } from '../store/Store'
import Appbar from './features/Appbar'
import Sidebar from './features/Sidebar'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  main: {
    height: '100vh',
    width: '100vw'
  }
}))

function App(props) {
  const { state } = useContext(Store)
  const classes = useStyles()

  return (
    <React.Fragment>
      {console.log(state)}
      <div className={classes.root}>
        <Grid container xs12 className={classes.main}>
          <Appbar />
          <Sidebar />
          {props.children}
        </Grid>

      </div>
    </React.Fragment>
  );
}

export default App;
