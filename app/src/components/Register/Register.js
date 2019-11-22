import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, withStyles, TextField, Container } from '@material-ui/core';
import { Card, CardContent, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = (theme => ({
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
    subtitle: {
        color: "red"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "98%",
    },
    name: {
        display: "flex",
        flexWrap: "nowrap",
    },
    card: {
        width: 700,
        height: "100%",
    },
    cardcontent: {
        display: "flex",
        flexDirection: "column",
    },
    login: {
        color: "#fff"
    },
    cardbox: {
        marginTop: "5%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    },
    reg: {
        marginLeft: 5,
        marginTop: 20,
        marginRight: -2
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
        marginRight: 10,
        marginBottom: 20
    },
    bar: {
        background: "transparent"
    }
}));

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            username: "",
            firstname: "",
            lastname: ""
        }
    }

    handleSubmit = (e) => {
        axios({
            method: "POST",
            url: `http://localhost:4000/register`,
            headers: this.state
        })
            .then(e => console.log(e))
            .catch(e => console.log(e))
    }


    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root} >
                <AppBar position="static" className={classes.bar}>
                    <Container maxWidth="md">
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                Register
                    </Typography>
                            <Link to="/">
                                <Button color="inherit" className={classes.login}>Login</Button>
                            </Link>
                        </Toolbar>
                    </Container>
                </AppBar>
                <div className={classes.cardbox}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardcontent}>
                            <span className={classes.subtitle}>
                                * Required Fields
                    </span>
                            <form noValidate autoComplete="off">
                                <div className={classes.name}>
                                    <TextField
                                        required
                                        id="firstname"
                                        className={classes.textField}
                                        label="First Name"
                                        margin="normal"
                                        variant="outlined"
                                        name="firstname"
                                        type="firstname"
                                        onChange={e => this.handleChange(e)}
                                    />
                                    <TextField
                                        required
                                        id="lastname"
                                        className={classes.textField}
                                        label="Last Name"
                                        margin="normal"
                                        variant="outlined"
                                        name="lastname"
                                        type="lastname"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <TextField
                                    required
                                    id="username"
                                    className={classes.textField}
                                    label="Username"
                                    margin="normal"
                                    variant="outlined"
                                    name="username"
                                    type="username"
                                    onChange={e => this.handleChange(e)}
                                />
                                <TextField
                                    required
                                    id="email"
                                    className={classes.textField}
                                    label="Email"
                                    margin="normal"
                                    variant="outlined"
                                    name="email"
                                    type="email"
                                    onChange={e => this.handleChange(e)}
                                />
                                <div className={classes.name}>
                                    <TextField
                                        required
                                        id="password"
                                        className={classes.textField}
                                        label="Password"
                                        margin="normal"
                                        variant="outlined"
                                        name="password"
                                        type="password"
                                        onChange={e => this.handleChange(e)}
                                    />
                                    <TextField
                                        id="password2"
                                        className={classes.textField}
                                        label="Retype Password"
                                        margin="normal"
                                        variant="outlined"
                                        name="password2"
                                        type="password"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className={classes.buttons}>
                                    <Link to="/">
                                        <Button
                                            className={classes.reg}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Cancel
                            </Button>
                                    </Link>

                                    <Button
                                        className={classes.reg}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Register
                            </Button>
                                </div>
                            </form>

                        </CardContent>
                    </Card>
                </div>
            </div >
        );
    }
}

export default withStyles(useStyles)(Register);