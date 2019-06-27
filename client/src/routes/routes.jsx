import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Welcome from '../views/welcome';
import App from '../components/App';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Welcome} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/dashboard" component={App} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
