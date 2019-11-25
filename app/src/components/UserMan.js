import React, { Component} from 'react';
import { AppBar, Container, Toolbar, Typography, makeStyles, Button } from '@material-ui/core'
import MaterialTable from 'material-table';

const useStyles = makeStyles(theme => ({
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
}));

export default class UserMan extends Component {
    const classes = useStyles();
    const [state, setState] = React.useState({
        columns: [
            { title: 'First Name', field: 'firstname' },
            { title: 'Last Name', field: 'lastname' },
            { title: 'User Name', field: 'username' },
            { title: 'Email', field: 'email' },
            { title: 'Active', field: 'active' }
        ],
        data: [
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            {
                name: 'Zerya Betül',
                surname: 'Baran',
                birthYear: 2017,
                birthCity: 34,
            },
        ],
    });

    const logOut = e => {
        e.preventDefault();
        localStorage.removeItem('token');
        props.history.push("/");
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Container maxWidth="md">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            User Management
                    </Typography>
                        <Button color="inherit" className={classes.logout} onClick={logOut}>Logout</Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <MaterialTable
                title="User Manager"
                columns={state.columns}
                data={state.data}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                setState(prevState => {
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
                                    setState(prevState => {
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
                                setState(prevState => {
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