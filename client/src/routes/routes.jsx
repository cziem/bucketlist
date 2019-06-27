import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Welcome from '../views/welcome';
import App from '../components/App';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Welcome} />
			<Route exact path="/dashboard" component={App} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
