import React from 'react'
import { AppBar, Toolbar, Typography, makeStyles, CardActions } from '@material-ui/core';
import { Card, CardContent, Button, TextField, Tooltip } from '@material-ui/core';
import { Route, Link } from 'react-router-dom';

import Register from '../Register/Register';


const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
    title: {
        flexGrow: 1,

    },
    link: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginLeft: 35,
        marginTop: -20
    },
    card: {
        width: 450,
        height: 500,
    },
    textField: {
        width: 370,
    },
    cardcontent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        alignContent: "center",
        margin: "auto",
        marginTop: "20%"
    },
    link2: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginLeft: 10,
        marginTop: "20%"
    },
    next: {
        marginRight: 25
    },
    bar: {
        background: "transparent",
        color: "#000"
    },
}));

export default function LoginPage(props) {
    const classes = useStyles();

    const cont = e => {
        e.preventDefault();
        props.nextStep();
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                {/* <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Sign In
                        </Typography>
                    </Toolbar>
                </AppBar> */}
                <AppBar position="static" className={classes.bar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Sign In
                    </Typography>
                    </Toolbar>
                </AppBar>
                <CardContent className={classes.cardcontent}>
                    <TextField
                        required
                        id="email"
                        className={classes.textField}
                        label="Email"
                        margin="normal"
                        variant="outlined"
                        name="email"
                        type="email"
                        value={props.email}
                        onChange={e => props.handleChange(e)}
                    />
                </CardContent>
                <div className={classes.link}>
                    <Tooltip title="You don't have permission to do this">
                        <span>
                            <Button disabled size="small" color="primary" >
                                Forgot Email?
                            </Button>
                        </span>
                    </Tooltip>
                </div>
                <CardContent className={classes.link2} >
                    <CardActions>
                        <Link to="/register">
                            <Button
                                size="small"
                                color="primary"
                            >
                                Create an account
                            </Button>
                        </Link>
                    </CardActions>
                    <Button
                        className={classes.next}
                        variant="contained"
                        color="primary"
                        onClick={cont}>
                        Next
                    </Button>
                </CardContent>
            </Card>
            <Route path="/register" component={Register} />
        </div>
    )
}