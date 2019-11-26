import React, { Component } from 'react';
import { AppBar, Container, Toolbar, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import MaterialTable from 'material-table';
import axios from 'axios';

const useStyles = {
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    logout: {
        color: "#fff"
    },
    table: {
        background: "red"
    }
};


class UserMan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Email', field: 'email' },
                { title: 'User Name', field: 'username' },
                { title: 'First Name', field: 'firstName' },
                { title: 'Last Name', field: 'lastName' },
                { title: 'Active', field: 'active' }
            ],
            data: [
            ],
        }
    }

    componentDidMount = () => {
        axios({
            method: 'get',
            url: `http://localhost:4000/users`,
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
            .then(data => {
                console.log(data)
            })
            .catch(e => console.log(e.data))
    }


    logOut = (e) => {
        localStorage.clear();
        this.props.history.push("/");
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Container maxWidth="md">
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                User Management
                            </Typography>
                            <Button className={classes.logout} onClick={this.logOut}>Logout</Button>
                        </Toolbar>
                    </Container>
                </AppBar>
                <MaterialTable
                    title="User Manager"
                    columns={this.state.columns}
                    data={this.state.data}
                    editable={{
                        onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    this.setState(prevState => {
                                        const data = [...prevState.data];
                                        data.push(newData);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        this.setState(prevState => {
                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = newData;
                                            return { ...prevState, data };
                                        });
                                    }
                                }, 600);
                            }),
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    this.setState(prevState => {
                                        const data = [...prevState.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                    }}
                />
            </div >
        );
    }

};

export default withStyles(useStyles)(UserMan);