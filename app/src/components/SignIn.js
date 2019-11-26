import React, { useState , useEffect }from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SideDiv from './SideDiv';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
export default function SignIn(props) {
    const classes = useStyles();
    const [account,setAccount] = useState({
        email:'',
        password:''
    })
    const [isError,setIsError] = useState({
        email: false,
        password:false
    })
    const [match,setMatch] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("token")) {    
            props.history.push("/manage-users");
        }
        let login = localStorage.getItem('notif') ? true : false
        if(login){
            toast.success(JSON.parse(localStorage.getItem('notif')))
            localStorage.removeItem('notif')
        }
    }, [])
    const handleAccount = (e) => {
        setIsError({...isError, [e.target.name]: e.target.value ? false : true,})
        setAccount({...account,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:4001/login',
            data: account,
            })
            .then( res =>  {
                localStorage.setItem('token',JSON.stringify(res.data.accessToken));
                localStorage.setItem('notif',JSON.stringify('Successfully Logged In.'));
                props.history.push('/manage-users')
            })
            .catch(err => {
                console.log(err)
                toast.error('Invalid Email and Password')
                setMatch(true)
        })
    }

    return (
        <React.Fragment>
            <div className="App">
                <ToastContainer enableMultiContainer position={toast.POSITION.TOP_RIGHT} />
                <SideDiv link ='signup' name='Sign Up'/>
                <div className='form'>
                    <Container maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5">
                            Sign In
                            </Typography>
                            <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    type='email'
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={account.email}
                                    onChange={e => handleAccount(e)}
                                    helperText={isError.email ? "Required." : match ? "Invalid Input" : ""}
                                    error={isError.email ? true : match ? true : false}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={account.password}
                                    onChange={e => handleAccount(e)}
                                    helperText={isError.password ? "Required." : match ? "Invalid Input" : ""}
                                    error={isError.password ? true : match ? true : false}
                                />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                            </form>
                        </div>
                    </Container>
                </div>
            </div>
            </React.Fragment>
    );
    
}

const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  