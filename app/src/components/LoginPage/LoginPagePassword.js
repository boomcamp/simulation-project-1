import React from 'react'
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { Card, CardContent, Button, TextField, CardActions } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: "none"
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
        justifyContent: "space-around",
        alignItems: "flex-start",
        marginLeft: 10,
        marginTop: "22%"
    },
    back: {
        marginRight: -10
    },
    ok: {
        marginRight: -10
    },
    forgot: {
        marginLeft: -33
    },
    button: {
        marginRight: -50
    }
}));

export default function LoginPage(props) {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            <Card className={classes.card}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Sign In
                        </Typography>
                    </Toolbar>
                </AppBar>
                <CardContent className={classes.cardcontent}>
                    <TextField
                        id="password"
                        className={classes.textField}
                        label="Password"
                        margin="normal"
                        variant="outlined"
                        name="password"
                        type="password"
                        onChange={e => props.handleChange(e)}
                    />
                </CardContent>
                <CardContent className={classes.link2}>
                    <CardActions>
                        <Button disabled size="small" color="primary" className={classes.forgot}>
                            Forgot Password?
                        </Button>
                    </CardActions>
                    <div className={classes.button}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.back}
                            onClick={props.prevStep}>
                            Back
                        </Button>
                    </div>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.ok}
                            onClick={props.handleLogin}
                        >
                            OK
                        </Button>
                </CardContent>
            </Card>
        </div >
    )

}