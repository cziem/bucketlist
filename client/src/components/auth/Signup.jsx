import React, { useState } from 'react';
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
import axios from 'axios';

const Signup = () => {
	const classes = useStyles();
	const initialState = {
		username: '',
		password: '',
		email: '',
		name: '',
		isValid: false,
		loading: false
	};
	const [
		{ username, password, name, email, isValid, loading },
		setState
	] = useState(initialState);

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
				password,
				email,
				name
			};

			axios
				.post('/auth/signup', userDetails)
				.then(res => {
					console.log(res.data);
				})
				.catch(err => {
					console.log(err.response.data);
				});
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
									Let's get you started
								</Typography>
								<Typography variant="subtitle2" className={classes.subTitle}>
									create your special account
								</Typography>
							</div>

							<form onSubmit={handleSubmit} className={classes.form}>
								<div className={classes.inputGroup}>
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor="name">name</InputLabel>
										<Input
											id="name"
											name="name"
											value={name}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										<FormHelperText id="name">Enter your name</FormHelperText>
									</FormControl>
								</div>
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
										<InputLabel htmlFor="email">email</InputLabel>
										<Input
											id="email"
											name="email"
											value={email}
											type="email"
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										<FormHelperText id="email">Enter your email</FormHelperText>
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
										<FormHelperText id="username">
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
											'signup'
										)}
									</Button>
									<Button className={classes.btn} variant="text" href="/login">
										login
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
		height: '90%'
	},
	title: {
		padding: '1rem 2rem'
	},
	leadText: {
		marginTop: '0.5rem'
	},
	subTitle: {
		color: '#aaa7a7'
	},
	form: {
		width: '80%',
		margin: '3% auto'
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

export default Signup;
