import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Welcome from '../views/welcome';
import Dashboard from '../components/Dashboard';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import setAuthToken from '../utils/setAuthToken';
// import { logoutUser } from '../actions/Actions';
import PrivateRoute from '../utils/PrivateRoute';

if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);

	// if (localStorage.jwtToken.exp) {
	// 	Store.dispatch(logoutUser);
	// }
}

const Routes = () => (
	<BrowserRouter>
		<Route exact path="/" component={Welcome} />
		<Route exact path="/login" component={Login} />
		<Route exact path="/signup" component={Signup} />
		<Switch>
			<PrivateRoute exact path="/dashboard" component={Dashboard} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
