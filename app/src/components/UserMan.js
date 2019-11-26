import React, { Component } from 'react';
import { AppBar, Container, Toolbar, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import MaterialTable from 'material-table';
import axios from 'axios';

const useStyles = {
    root: {
        display: "flex",
        flexDirection: "column",
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
        width: "100%"
    }
};

class UserMan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'First Name', field: 'firstName' },
                { title: 'Last Name', field: 'lastName' },
                { title: 'User Name', field: 'username' },
                { title: 'Email', field: 'email' },
                {
                    title: 'Active',
                    field: 'active',
                    lookup: {
                        true: (
                            <CheckRoundedIcon />
                        ),
                        false: (
                            <CloseRoundedIcon />
                        )
                    }
                }
            ],
            localStorage: localStorage.getItem('token'),
            users: []
        }
    }

    componentDidMount = () => {
        if (localStorage) {
            axios({
                method: 'get',
                url: `http://localhost:4000/users`,
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
                .then(data => {
                    this.setState({
                        users: data.data
                    })
                })
                .catch(e => console.log(e))
        } else {
            this.props.history.push("/login")
        }
    }

    handleRefresh = () => {

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
                    <Container maxWidth="lg">
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                User Management
                            </Typography>
                            <Button className={classes.logout} onClick={this.logOut}>Logout</Button>
                        </Toolbar>
                    </Container>
                </AppBar>
                <MaterialTable
                    className={classes.table}
                    title="Users"
                    columns={this.state.columns}
                    data={this.state.users}
                    editable={{
                        onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    this.setState(prevState => {
                                        const data = [...prevState.users];
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
                                            const data = [...prevState.users];
                                            data[data.indexOf(oldData)] = newData;
                                            return { ...prevState, data };
                                        });
                                    }
                                }, 600);
                                axios
                                    .patch(`http://localhost:4000/users/${newData.id}`,
                                        {
                                            email: newData.email,
                                            username: newData.username,
                                            firstName: newData.firstName,
                                            lastName: newData.lastName,
                                            active: newData.active
                                        },
                                        {
                                            headers: {
                                                Authorization: `Bearer` + localStorage
                                            }
                                        }
                                    )
                                    .then(e => console.log(e))
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