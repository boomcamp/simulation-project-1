import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, withStyles, TextField, Container, Card, CardContent, Button } from '@material-ui/core';
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
    },
    errormsg: {
        color: "red",
        fontSize: 12,
    },
    error50: {
        display: "flex",
        margin: "auto"
    },
    error100: {
        display: "flex"
    }
}));

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: "",
                password: "",
                username: "",
                firstName: "",
                lastName: "",
                active: true
            },
            dataErr: {
                emailerr: "",
                passworderr: "",
                password2err: "",
                usernameerr: "",
                firstNameerr: "",
                lastNameerr: ""
            },
            password2: ""
        }
    }



    handleChange = e => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            },
            dataErr: {
                ...this.state.dataErr,
                [`${e.target.name}err`]: this.validate(e.target.name, e.target.value)
            }
        });

        console.log(this.state.data)
    }

    handleChangeEer = e => {
        if (e.target.value !== this.state.data.password) {
            this.setState({
                ...this.state,
                dataErr: { [e.target.name]: e.target.value }
            });
        }
    }

    validate = (getName, getValue) => {
        var passregex = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
        let data = '';
        if (getName === 'firstName') getValue.length > 1 ? data = "" : data = "firstname should be more than 2 character*"
        if (getName === 'lastName') getValue.length > 1 ? data = "" : data = "lastname should be more than 2 character*"
        if (getName === 'username') getValue.length > 5 ? data = "" : data = "username should be more than 5 character*"
        if (getName === 'password') getValue.length < 6 ? data = "password must have a minimum of 6 characters*"
            : getValue.match(passregex) ? data = "password must contain 1uppercase, a number, & 1 special case character*" : data = "";

        return data
    }

    handleSubmit = (e) => {
        e.preventDefault();

        axios({
            method: "post",
            url: `http://localhost:4000/register/active=true`,
            data: this.state.data
        })
            .then(e => {
                this.props.history.push("/")
            })
            .catch(e => console.log(e))
    }

    render() {
        const { classes } = this.props;
        const { email, password, password2, username, firstname, lastname } = this.state;
        return (
            <div className={classes.root} >
                <AppBar position="static" className={classes.bar}>
                    <Container maxWidth="lg">
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
                            <form autoComplete="off" onSubmit={this.handleSubmit}>
                                <div className={classes.name}>
                                    <TextField
                                        required
                                        id="firstname"
                                        className={classes.textField}
                                        label="First Name"
                                        margin="normal"
                                        variant="outlined"
                                        name="firstName"
                                        type="firstname"
                                        value={firstname}
                                        onChange={e => this.handleChange(e)}
                                    />
                                    <TextField
                                        required
                                        id="lastname"
                                        className={classes.textField}
                                        label="Last Name"
                                        margin="normal"
                                        variant="outlined"
                                        name="lastName"
                                        type="lastname"
                                        value={lastname}
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className={classes.error50}>
                                    <div className={classes.errormsg}>{this.state.dataErr.firstNameerr}</div>
                                    <div className={classes.errormsg}>{this.state.dataErr.lastNameerr}</div>
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
                                    value={username}
                                    onChange={e => this.handleChange(e)}
                                />
                                <div className={classes.errormsg}>{this.state.dataErr.usernameerr}</div>
                                <TextField
                                    required
                                    id="email"
                                    className={classes.textField}
                                    label="Email"
                                    margin="normal"
                                    variant="outlined"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={e => this.handleChange(e)}
                                />
                                <div>
                                    <div className={classes.errormsg}>{this.state.dataErr.emailerr}</div>
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
                                            value={password}
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
                                            value={password2}
                                            onChange={e => this.handleChangeEer(e)}
                                        />
                                    </div>
                                </div>
                                <div className={classes.error50}>
                                    <div className={classes.errormsg}>{this.state.dataErr.passworderr}</div>
                                    <div className={classes.errormsg}>{this.state.dataErr.password2err}</div>
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