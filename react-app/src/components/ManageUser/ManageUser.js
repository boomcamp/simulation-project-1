import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Container } from "@material-ui/core";
import axios from "axios";
import Box from "@material-ui/core/Box";
import Swal from "sweetalert2";
import ManageAppBar from "../AppBar/ManageAppBar";
import green from "../../images/greenDot.png";
import red from "../../images/redDot.png";

export default function ManageUser(props) {
  var token = localStorage.getItem("Token");

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
      { title: "Email Address", field: "email" },
      { title: "Firstname", field: "firstName" },
      { title: "Lastname", field: "lastName" },
      { title: "Username", field: "username" },
      {
        title: "Active Status",
        field: "active",
        render: rowData => (
          <h1 style={{ paddingLeft: 35 }}>
            {rowData.active === true ? (
              <img style={{ height: 10, borderRadius: "50%" }} src={green} />
            ) : (
              <img style={{ height: 10, borderRadius: "50%" }} src={red} />
            )}
          </h1>
        )
      }
    ],
    data: []
  });
  if (token) {
    return (
      <Box>
        <ManageAppBar />
        <Container style={{ marginTop: "100px" }}>
          <MaterialTable
            style={{ paddingLeft: "25px" }}
            title="Users Data"
            columns={state.columns}
            data={[...state.data]}
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
