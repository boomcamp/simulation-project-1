import React, { useState } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import Navigation from "../components/includes/Navigation";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorIcon from "@material-ui/icons/Error";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(5, 5)
	},
	grid: {
		flexGrow: 1,
		flexWrap: "wrap"
	},
	button: {
		margin: theme.spacing(1)
	},
	margin: {
		margin: theme.spacing(1)
	},
	success: {
		backgroundColor: theme.palette.error.dark
	},
	message: {
		display: "flex",
		alignItems: "center"
	},
	backgroundSucces: {
		background: "green"
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1)
	}
}));
function Register(props) {
	const classes = useStyles();

	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const [email, setEmail] = useState(null);
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);
	const [matchPassword, setMatchPassword] = useState(true);
	const [validEmail, setValidEmail] = useState(null);
	const [open, setOpen] = useState(false);

	function auth() {
		if (firstName && lastName && email && username && password && confirmPassword) {
			if (/^[a-zA-Z0-9-.-_]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
				setValidEmail(true);
				if (password === confirmPassword) {
					setMatchPassword(true);
					console.log(username, email, password, firstName, lastName);
					Axios.post("http://localhost:3000/register", {
						email: email,
						password: password,
						firstName: firstName,
						lastName: lastName,
						username: username,
						active: true
					})
						.then(response => {
							sessionStorage.setItem("success", true);
							props.history.push("/login");
						})
						.catch(error => {
							try {
								store.addNotification({
									title: "Message!",
									message: error.response.data,
									type: "danger",
									insert: "top",
									container: "top-right",
									animationIn: ["animated", "fadeIn"],
									animationOut: ["animated", "fadeOut"],
									width: 300,
									dismiss: {
										duration: 5000
									}
								});
							} catch {
								console.log(error);
							}
							//setOpen(true);
						});
				} else {
					setMatchPassword(null);
				}
			} else {
				setValidEmail(false);
			}
		} else {
			if (firstName === null) setFirstName("");

			if (lastName === null) setLastName("");

			if (email === null) setEmail("");

			if (username === null) setUsername("");

			if (password === null) setPassword("");

			if (confirmPassword === null) setConfirmPassword("");
		}
	}

	const checkPassword = e => {
		setConfirmPassword(e.target.value);
		if (e.target.value === password) {
			setMatchPassword(true);
		} else setMatchPassword(false);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};
	return (
		<div>
			<Snackbar
				anchorOrigin={{
					vertical: "top",
					horizontal: "center"
				}}
				open={open}
				autoHideDuration={5000}
				onClose={handleClose}
			>
				<SnackbarContent
					className={classes.success}
					message={
						<span id="message-id" className={classes.message}>
							{" "}
							<ErrorIcon className={classes.iconVariant} /> Registration failed! 400 Bad Request
						</span>
					}
					action={[
						<IconButton key="close" aria-label="close" color="inherit" className={classes.close} onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					]}
				/>
			</Snackbar>
			<Navigation />
			<CssBaseline />
			<Container style={{ marginTop: "5%", width: "35%" }}>
				<Grow in>
					<Paper className={classes.root}>
						<Typography component="div" variant="h6" style={{ textAlign: "center" }}>
							Register
							<Grid container spacing={1} justify="center">
								<form>
									<Grid container style={{ width: "100%" }} justify="space-between">
										<TextField
											className={classes.textField}
											error={firstName !== "" ? false : true}
											helperText={firstName !== "" ? false : "This field is required!"}
											label="First Name"
											margin="normal"
											variant="outlined"
											color="primary"
											name="firstName"
											autoComplete="off"
											style={{ width: "48%" }}
											onChange={e => setFirstName(e.target.value)}
											required
										/>
										<TextField
											className={classes.textField}
											error={lastName !== "" ? false : true}
											helperText={lastName !== "" ? false : "This field is required!"}
											label="Last Name"
											margin="normal"
											variant="outlined"
											color="primary"
											name="lastName"
											autoComplete="off"
											style={{ width: "48%" }}
											onChange={e => setLastName(e.target.value)}
											required
										/>
									</Grid>
									<Grid style={{ width: "100%" }}>
										<TextField
											className={classes.textField}
											error={validEmail === false || email === "" ? true : false}
											helperText={
												email !== ""
													? validEmail === false
														? "Invalid email format"
														: false
													: "This field is required!"
											}
											label="Email"
											margin="normal"
											variant="outlined"
											color="primary"
											type="email"
											name="email"
											autoComplete="off"
											fullWidth
											onChange={e => setEmail(e.target.value)}
											required
										/>
									</Grid>
									<Grid container style={{ width: "100%" }} justify="space-between">
										<TextField
											className={classes.textField}
											error={username !== "" ? false : true}
											helperText={username !== "" ? false : "This field is required!"}
											label="Username"
											margin="normal"
											variant="outlined"
											color="primary"
											name="username"
											autoComplete="off"
											fullWidth
											onChange={e => setUsername(e.target.value)}
											required
											style={{ width: "48%" }}
										/>
										<TextField
											className={classes.textField}
											error={password !== "" ? false : true}
											helperText={password !== "" ? false : "This field is required!"}
											label="Password"
											margin="normal"
											variant="outlined"
											color="primary"
											type="password"
											name="password"
											autoComplete="off"
											fullWidth
											onChange={e => setPassword(e.target.value)}
											required
											style={{ width: "48%" }}
										/>
										<TextField
											className={classes.textField}
											error={confirmPassword !== "" ? (matchPassword ? false : true) : true}
											helperText={
												confirmPassword !== ""
													? matchPassword
														? null
														: "Password do not match!"
													: "This field is required!"
											}
											label="Confirm Password"
											margin="normal"
											variant="outlined"
											color="primary"
											type="password"
											name="password"
											autoComplete="off"
											fullWidth
											onChange={e => checkPassword(e)}
											required
										/>
									</Grid>

									<Button variant="contained" color="secondary" className={classes.button} onClick={() => auth()}>
										Register
									</Button>
								</form>
							</Grid>
						</Typography>
					</Paper>
				</Grow>
			</Container>
		</div>
	);
}

export default Register;
