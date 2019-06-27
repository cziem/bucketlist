import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Button, Divider } from '@material-ui/core/';

const Welcome = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={12} className={classes.main}>
					<Paper className={classes.paper} elevation="2">
						<Typography variant="h2" className={classes.title}>
							<span style={{ color: '#6767e6' }}>Bucket</span>
							<span style={{ color: '#8383d4' }}>List</span>
						</Typography>

						<div className={classes.leadText}>
							<Typography variant="h5" className={classes.lead}>
								Containerize your actions
							</Typography>
							<Typography variant="subtitle2" className={classes.subTitle}>
								smart | collected | fast{' '}
							</Typography>
						</div>

						<Divider light variant="inset" className={classes.divider} />

						<div className={classes.cta}>
							<Button
								variant="contained"
								size="large"
								color="primary"
								fullWidth
							>
								login
							</Button>
							<Button
								variant="outlined"
								color="secondary"
								size="large"
								fullWidth
							>
								sign up
							</Button>
						</div>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

/* Styles */
const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	main: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '85%',
		height: '100vh'
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: '75%'
	},
	title: {
		padding: '1rem 2rem 2rem'
	},
	leadText: {
		marginTop: '1rem'
	},
	subTitle: {
		color: '#aaa7a7'
	},
	cta: {
		padding: '2rem',
		// marginTop: '18%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: '8rem'
	},
	divider: {
		margin: '20% auto 8%',
		width: '68%'
	}
}));

export default Welcome;
