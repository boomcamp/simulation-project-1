import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Container } from "@material-ui/core";
import axios from "axios";

export default function ManageUser() {
  useEffect(async () => {
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx5emFtaXJhYmV0ZUBib29vb29tLmNhbXAiLCJpYXQiOjE1NzQ0MTA3NzUsImV4cCI6MTU3NDQxNDM3NSwic3ViIjoiNTkifQ._RPRX9k2O4NI8p2M_nDGfzaBUa273IClVQy5xOLSu0o";
    const result = await axios({
      method: "get",
      url: `http://localhost:3000/users`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setData({
      data: [...result.data]
    });
  }, []);

  const [data, setData] = React.useState([]);
  const [state, setState] = React.useState({
    columns: [
      { title: "Email Address", field: "email" },
      { title: "Firstname", field: "firstName" },
      { title: "Lastname", field: "lastName" },
      { title: "Username", field: "username" },
      { title: "Active Status", field: "active" }
    ]
  });
  return (
    <Container style={{ marginTop: "50px" }}>
      <MaterialTable
        style={{}}
        title="Users Data"
        columns={state.columns}
        data={data.data}
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
  );
}
