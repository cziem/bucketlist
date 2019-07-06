import React from 'react';
import '../styles/App.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Appbar from './features/Appbar';
import Sidebar from './features/Sidebar';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	main: {
		height: '100vh',
		width: '100vw'
	}
}));

const Dashboard = props => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container xs12 className={classes.main}>
				<Appbar />
				<Sidebar />
			</Grid>
		</div>
	);
};

export default Dashboard;
