import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Container } from "@material-ui/core";
import axios from "axios";
import Box from "@material-ui/core/Box";
import Swal from "sweetalert2";
import ManageAppBar from "../AppBar/ManageAppBar";
import { ThemeProvider } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import Badge from "@material-ui/core/Badge";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2)
  },
  padding: {
    padding: theme.spacing(0, 2)
  },
  badge: {
    minWidth: "0px",
    height: "12px",
    marginTop: "12px"
  }
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#11CB5F"
    },
    secondary: {
      main: "#CB3311"
    }
  }
});

export default function ManageUser(props) {
  var token = localStorage.getItem("Token");
  const classes = useStyles();

  useEffect(async () => {
    const result = await axios({
      method: "get",
      url: `http://localhost:3000/users`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setState({ ...state, data: result.data });
  }, []);

  const [state, setState] = React.useState({
    columns: [
      { title: "Email Address", field: "email", filtering: false },
      { title: "Firstname", field: "firstName", filtering: false },
      { title: "Lastname", field: "lastName", filtering: false },
      { title: "Username", field: "username", filtering: false },
      {
        title: "Active Status",
        field: "active",
        filtering: true,
        lookup: {
          true: "active",
          false: "inactive"
        },
        render: rowData => (
          <ThemeProvider theme={theme}>
            <Badge
              classes={{
                colorPrimary: classes.badge,
                colorSecondary: classes.badge
              }}
              color={
                rowData.active === "true" || rowData.active === true
                  ? "primary"
                  : "secondary"
              }
              badgeContent={" "}
              className={classes.margin}
            >
              <Typography className={classes.padding}>
                {rowData.active === "true" || rowData.active === true
                  ? "Active"
                  : "Inactive"}
              </Typography>
            </Badge>
          </ThemeProvider>
        )
      }
    ],
    data: []
  });
  if (token) {
    return (
      <Box>
        <ManageAppBar />
        <Container style={{ marginTop: "50px" }}>
          <MaterialTable
            style={{
              paddingLeft: "25px",
              overflowY: "scroll",
              maxHeight: "80vh"
            }}
            title="Users Data"
            columns={state.columns}
            data={[...state.data]}
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
                  }, 400);
                  axios
                    .patch(
                      `http://localhost:3000/users/${newData.id}`,
                      {
                        email: newData.email,
                        username: newData.username,
                        firstName: newData.firstName,
                        lastName: newData.lastName,
                        active: newData.active
                      },
                      {
                        headers: { Authorization: `Bearer ${token}` }
                      }
                    )
                    .then(
                      Swal.fire({
                        icon: "success",
                        title: "Account has been successfully edited!"
                      })
                    );
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    setState(prevState => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      return { ...prevState, data };
                    });
                  }, 600);
                  axios
                    .delete(`http://localhost:3000/users/${oldData.id}`, {
                      headers: { Authorization: `Bearer ${token}` }
                    })
                    .then(
                      Swal.fire({
                        icon: "success",
                        title: "Account has been successfully deleted!"
                      })
                    );
                })
            }}
          />
        </Container>
      </Box>
    );
  } else {
    Swal.fire({
      title: "Unable to access page",
      text: "Please login first!",
      icon: "error"
    }).then(result => {
      if (result.value) {
        window.location.href = "/login";
      }
    });

    return null;
  }
}
