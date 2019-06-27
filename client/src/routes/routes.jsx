import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Welcome from '../views/welcome';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Welcome} />
			{/* <Route exact path="/card" component={Card} /> */}
		</Switch>
	</BrowserRouter>
);

export default Routes;
