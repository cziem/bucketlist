import React, { useContext } from 'react'
import { Route, Redirect } from "react-router-dom";
import { Store } from '../store/Store'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(Store);
  return (
    <React.Fragment>
      {console.log(state, 'privateRoute')}
      <Route
        {...rest}
        render={props => state.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
            <Redirect to="/login" />
          )}
      />
    </React.Fragment>
  )
}

export default PrivateRoute