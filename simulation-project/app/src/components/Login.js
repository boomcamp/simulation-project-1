import React, { useState, useEffect } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import Navigation from "../components/includes/Navigation";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(5, 2)
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: "95%"
	},
	button: {
		margin: theme.spacing(1)
	},
	close: {
		padding: theme.spacing(0.5)
	},
	success: {
		backgroundColor: theme.palette.error.dark
	},
	message: {
		display: "flex",
		alignItems: "center"
	},
	info: {
		backgroundColor: "#118bc5"
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1)
	}
}));

function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsgEmail, setErrorMsgEmail] = useState("");
	const [errorMsgPassword, setErrorMsgPassword] = useState("");
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [register, setRegister] = useState(false);

	function validate(email, password) {
		email === "" ? setErrorMsgEmail("This field is required!") : setErrorMsgEmail("");
		password === "" ? setErrorMsgPassword("This field is required!") : setErrorMsgPassword("");

		if (email !== "" && password !== "") {
			Axios.post("http://localhost:3000/login", {
				email: email,
				password: password
			})
				.then(response => {
					localStorage.setItem("auth", JSON.stringify(response.data));
					return Axios({
						method: "get",
						url: `http://localhost:3000/users/?email=${email}`,
						headers: {
							Authorization: `Bearer ${response.data.accessToken}`
						}
					});
				})
				.then(response => {
					localStorage.setItem("name", response.data[0].firstName + " " + response.data[0].lastName);
					props.history.push("/manageusers");
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
		}
	}

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
		setRegister(false);
	};

	useEffect(() => {
		if (sessionStorage.getItem("success")) {
			sessionStorage.removeItem("success");
			setRegister(true);
		}
	}, []);

	if (JSON.parse(localStorage.getItem("auth"))) {
		props.history.push("/manageusers");
	}
	return (
		<div>
			<Snackbar
				anchorOrigin={{
					vertical: "top",
					horizontal: "center"
				}}
				open={register}
				autoHideDuration={3000}
				onClose={handleClose}
			>
				<SnackbarContent
					className={classes.info}
					message={
						<span id="message-id" className={classes.message}>
							{" "}
							<InfoIcon className={classes.iconVariant} /> Account successfully registered!
						</span>
					}
					action={[
						<IconButton key="close" aria-label="close" color="inherit" className={classes.close} onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					]}
				/>
			</Snackbar>
			<Snackbar
				anchorOrigin={{
					vertical: "top",
					horizontal: "center"
				}}
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
			>
				<SnackbarContent
					className={classes.success}
					message={
						<span id="message-id" className={classes.message}>
							{" "}
							<ErrorIcon className={classes.iconVariant} /> Login Failed! invalid username or password!
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
			<Container style={{ marginTop: "5%" }} maxWidth="xs">
				<Grow in>
					<Paper className={classes.root}>
						<Typography component="div" variant="h6" style={{ textAlign: "center", height: "auto" }}>
							Login
							<TextField
								error={errorMsgEmail === "" ? false : true}
								helperText={errorMsgEmail ? errorMsgEmail : ""}
								className={classes.textField}
								label="Email"
								margin="normal"
								variant="outlined"
								color="primary"
								type="email"
								autoComplete="off"
								required
								onChange={e => setEmail(e.target.value)}
							/>
							<TextField
								error={errorMsgPassword === "" ? false : true}
								helperText={errorMsgPassword ? errorMsgPassword : ""}
								className={classes.textField}
								label="Password"
								type="password"
								margin="normal"
								variant="outlined"
								color="primary"
								required
								onChange={e => setPassword(e.target.value)}
							/>
							<Button
								type="submit"
								variant="contained"
								color="secondary"
								onClick={() => validate(email, password)}
								className={classes.button}
							>
								Login
							</Button>
						</Typography>
					</Paper>
				</Grow>
			</Container>
		</div>
	);
}

export default Login;
