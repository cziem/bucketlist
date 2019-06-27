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
	FormHelperText
} from '@material-ui/core/';
import isEmpty from '../../validation/isEmpty';
import axios from 'axios';

const Login = () => {
	const classes = useStyles();
	const initialState = {
		username: '',
		password: ''
	};
	const [{ username, password }, setState] = useState(initialState);

	const handleChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (isEmpty(username) || isEmpty(password)) {
			alert('You provided invalid creds');
		} else {
			const userDetails = {
				username,
				password
			};

			axios
				.post('/auth/login', userDetails)
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
									/>
									<FormHelperText id="username">
										Enter your password
									</FormHelperText>
								</FormControl>
							</div>

							<Button
								className={classes.btn}
								variant="contained"
								color="primary"
								fullWidth
								type="submit"
							>
								login
							</Button>
						</form>
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
		margin: '2rem 0'
	}
}));

export default Login;
