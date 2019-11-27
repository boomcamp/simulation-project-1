import React, { useState } from "react"
import {Link} from "react-router-dom"
import { makeStyles, createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"
import MaterialTable from "material-table"
import Axios from "axios"
import * as ls from "local-storage"
import Badge from "@material-ui/core/Badge"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2)
  },
  padding: {
    padding: theme.spacing(0, 2)
  }
}))
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#11cb5f"
    },
    secondary: {
      main: "#cb3311"
    }
  }
})
export default function MaterialTableDemo(props) {
  const classes = useStyles()
  const [stat, setStat] = useState(false)
  const [state, setState] = useState({
    columns: [
      { title: "Email Address", field: "email" },
      { title: "Firstname", field: "firstName" },
      { title: "Lastname", field: "lastName" },
      { title: "Username", field: "username" },
      { title: "Status", field: "active", 
              lookup: {
                true: "active",
                false: "inactive"
        },
        render: rowData => (
					<ThemeProvider theme={theme}>
						<Badge
							variant="dot"
							color={
								rowData.active === true || rowData.active === "true"
									? "primary"
									: rowData.active === "false" || rowData.active === false
									? "secondary"
									: ""
							}
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
  })
  if (!ls.get("token")) {
    props.history.push("/")
  } else {
    if (!stat) {
      Axios({
        method: "get",
        url: `http://localhost:3000/users`,
        headers: {
          Authorization: `Bearer ${ls.get("token")}`
        }
      }).then(response => setState({ ...state, data: response.data }))
      setStat(true)
    }
  }
  return (
    <>
    <div style={{margin: "10px 0 10px 90%"}}>
     <Link to="/">
     <Button 
      onClick={() => {ls.clear()}}
      variant="contained"
      color="primary">
      Log Out
    </Button>
    </Link>
    </div>
    <MaterialTable
          style={{ width: "90%", margin: "auto", marginTop: "30px" }}
					options={{
						filtering: true
					}}
      title="Users"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data]
                  data[data.indexOf(oldData)] = newData
                  return { ...prevState, data }
                })
              }
            }, 600)
            Axios.patch(
              `http://localhost:4000/users/${newData.id}`,
              {
                email: newData.email,
                username: newData.username,
                firstName: newData.firstName,
                lastName: newData.lastName,
                active: JSON.parse(newData.active)
              },
              {
                headers: { Authorization: `Bearer ${ls.get('token')}` }
              }
            ).then(alert("Account has been Successfully Edited!"))
          })
      }}
    />
    </>
  )
}
