import React, { useContext } from 'react';
import '../styles/App.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Store } from '../globalStore/store/Store';
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
	const { state } = useContext(Store);
	const classes = useStyles();

	return (
		<React.Fragment>
			{console.log('dashboard =>', state)}
			<div className={classes.root}>
				<Grid container xs12 className={classes.main}>
					<Appbar />
					<Sidebar />
					{props.children}
				</Grid>
			</div>
		</React.Fragment>
	);
};

export default Dashboard;
