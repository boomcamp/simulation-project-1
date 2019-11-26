import React, { useState } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Navigation from "../components/includes/Navigation";
import MaterialTable from "material-table";
import Axios from "axios";
import Grow from "@material-ui/core/Grow";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(2)
	},
	padding: {
		padding: theme.spacing(0, 2)
	}
}));

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#11cb5f"
		},
		secondary: {
			main: "#cb3311"
		}
	}
});

export default function ManageUsers(props) {
	const classes = useStyles();
	const [state, setState] = useState({
		columns: [
			{
				title: "Email Address",
				field: "email",
				filtering: false
			},
			{ title: "Firstname", field: "firstName", filtering: false },
			{ title: "Lastname", field: "lastName", filtering: false },
			{ title: "Username", field: "username", filtering: false },
			{
				title: "Status",
				field: "active",
				lookup: {
					true: "active",
					false: "inactive"
				},
				render: rowData => (
					<ThemeProvider theme={theme}>
						<Badge
							variant="dot"
							color={rowData.active === "true" || rowData.active === true ? "primary" : "secondary"}
							badgeContent={" "}
							className={classes.margin}
						>
							<Typography className={classes.padding}>
								{rowData.active === true || rowData.active === "true" ? "Active" : "Inactive"}
							</Typography>
						</Badge>
					</ThemeProvider>
				)
			}
		],
		data: []
	});

	const [stat, setStat] = useState(false);

	if (!JSON.parse(localStorage.getItem("auth"))) {
		props.history.push("/login");
	} else {
		var auth = JSON.parse(localStorage.getItem("auth"));
		if (!stat) {
			Axios({
				method: "get",
				url: `http://localhost:3000/users`,
				headers: {
					Authorization: `Bearer ${auth.accessToken}`
				}
			}).then(response => setState({ ...state, data: response.data }));

			setStat(true);
		}
	}

	return (
		<React.Fragment>
			<Navigation />
			<Grow in>
				<MaterialTable
					style={{ width: "90%", margin: "auto", marginTop: "30px" }}
					title="Users"
					columns={state.columns}
					data={state.data}
					options={{
						filtering: true
					}}
					editable={{
						onRowUpdate: (newData, oldData) =>
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
									if (oldData) {
										setState(prevState => {
											const data = [...prevState.data];
											data[data.indexOf(oldData)] = newData;
											return { ...prevState, data };
										});
									}
								}, 600);
								Axios.patch(
									`http://localhost:3000/users/${newData.id}`,
									{
										email: newData.email,
										username: newData.username,
										firstName: newData.firstName,
										lastName: newData.lastName,
										active: newData.active === "true" || newData.active === true
									},
									{
										headers: { Authorization: `Bearer ${auth.accessToken}` }
									}
								).then(() => {
									store.addNotification({
										title: "Message!",
										message: "Changes Saved!",
										type: "success",
										insert: "top",
										container: "top-right",
										animationIn: ["animated", "fadeIn"],
										animationOut: ["animated", "fadeOut"],
										width: 300,
										dismiss: {
											duration: 2000
										}
									});
								});
							})
					}}
				/>
			</Grow>
		</React.Fragment>
	);
}
