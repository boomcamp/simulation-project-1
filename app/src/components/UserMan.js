import React, { Component } from 'react';
import { AppBar, Container, Toolbar, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
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
                            <RemoveRoundedIcon />
                        )
                    }
                },
            ],
            localStorage: localStorage.getItem('token'),
            users: [],
        }
    }

    componentDidMount = () => {
        if (localStorage.getItem("token")) {
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
                    options={{ 
                        filtering: true, 
                        pageSizeOptions: [5,10], 
                        draggable: false,
                    }}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        this.setState(prevState => {
                                            const users = [...prevState.users];
                                            users[users.indexOf(oldData)] = newData;
                                            return { ...prevState, users };
                                        });
                                    }
                                    console.log(oldData)
                                }, 600);

                                axios({
                                    method: 'patch',
                                    url: `/users/${newData.id}`,
                                    data: {
                                        firstName: newData.firstName,
                                        lastName: newData.lastName,
                                        username: newData.username,
                                        active: newData.active,
                                        email: newData.email
                                    },
                                    headers: {
                                        Authorization: `Bearer ${this.state.localStorage}`
                                    }
                                })
                                    .then(e => console.log(e.data))
                                    .catch(err => console.log(err))
                            }),
                    }}
                />
            </div >
        );
    }

};

export default withStyles(useStyles)(UserMan);