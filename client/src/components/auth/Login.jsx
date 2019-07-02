import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
	Grid,
	Paper,
	Typography,
	Button,
	Input,
	FormControl,
	InputLabel,
	FormHelperText,
	CircularProgress
} from '@material-ui/core/';
import isEmpty from '../../validation/isEmpty';
import { login } from '../../globalStore/actions/userActions';
import { Store } from '../../globalStore/store/Store';

const Login = ({ history }) => {
	const { state, dispatch } = useContext(Store);
	const classes = useStyles();
	const initialState = {
		username: '',
		password: '',
		isValid: false,
		loading: false
	};
	const [{ username, password, isValid, loading }, setState] = useState(
		initialState
	);

	const handleChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const handleBlur = () => {
		if (isEmpty(username) || isEmpty(password)) {
			return;
		} else {
			setState(prevState => ({ ...prevState, isValid: true }));
		}
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (isEmpty(username) || isEmpty(password)) {
			setState(prevState => ({ isValid: false }));
		} else {
			setState(prevState => ({ ...prevState, isValid: true, loading: true }));

			const userDetails = {
				username,
				password
			};

			try {
				login(dispatch, userDetails);
			} finally {
				history.push('/dashboard');
			}

			// useEffect(() => history.push('/dashboard'), [state]);
		}

		clearState();
	};

	const clearState = () => setState({ ...initialState });

	return (
		<React.Fragment>
			<div className={classes.root}>
				<Grid container>
					<Grid item xs={12} className={classes.main}>
						<Paper className={classes.paper} elevation={2}>
							<Typography variant="h2" className={classes.title}>
								<span style={{ color: '#6767e6' }}>Bucket</span>
								<span style={{ color: '#8383d4' }}>List</span>
							</Typography>

							<div className={classes.leadText}>
								<Typography variant="h5" className={classes.lead}>
									Welcome back
								</Typography>
								<Typography variant="subtitle2" className={classes.subTitle}>
									login to your account{' '}
								</Typography>
							</div>

							<form onSubmit={handleSubmit} className={classes.form}>
								<div className={classes.inputGroup}>
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="username">username</InputLabel>
										<Input
											id="username"
											name="username"
											value={username}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										<FormHelperText id="username">
											Enter your username
										</FormHelperText>
									</FormControl>
								</div>
								<div className={classes.inputGroup}>
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="password">password</InputLabel>
										<Input
											id="password"
											name="password"
											type="password"
											value={password}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										<FormHelperText id="password">
											Enter your password
										</FormHelperText>
									</FormControl>
								</div>

								<div className={classes.cta}>
									<Button
										className={classes.btn}
										variant="contained"
										color="primary"
										fullWidth
										type="submit"
										disabled={!isValid || loading}
									>
										{loading ? (
											<CircularProgress
												variant="indeterminate"
												color="primary"
												size={20}
												thickness={2}
											/>
										) : (
											'login'
										)}
									</Button>
									<Button className={classes.btn} variant="text" href="/signup">
										Signup
									</Button>
								</div>
							</form>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</React.Fragment>
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
	form: {
		width: '80%',
		margin: '10% auto'
	},
	inputGroup: {
		display: 'block',
		marginBottom: '.5rem'
	},
	formControl: {
		width: '90%'
	},
	btn: {
		marginBottom: '0.5rem'
	},
	cta: {
		padding: '2rem 0',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: '4rem'
	}
}));

export default withRouter(Login);
