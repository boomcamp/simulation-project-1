import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { Redirect} from 'react-router-dom';

import SideDiv from './SideDiv';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
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

export default function SignUp(props) {
    const classes = useStyles();
    const [user,setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        active: true
    })

    const [isError,setIsError] = useState({
        firstName: false,
        lastName: false,
        email: false,
        username: false,
        password: false,
        confirmPassword: false
    })
    const [confirmPass,setConfirmPass] = useState('');
    const [match,setMatch] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {    
            props.history.push("/");
        }
    }, [])
    const handleUser = (e) => {
        setIsError({...isError, [e.target.name]: e.target.value ? false : true,})
        setUser({...user,[e.target.name]:e.target.value})
    }
    const handleConPass = (e) => {
        setConfirmPass(e.target.value);
        setIsError({...isError, [e.target.name]: e.target.value ? false : true,})
        
        return  e.target.value === user.password ?
                setMatch(false) : setMatch(true)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const {firstName,lastName,email,username,password} = user;
        if (firstName && lastName&&email&&username&&password&&confirmPass){
            if(password === confirmPass){
                    axios({
                        method: 'post',
                        url: 'http://localhost:4001/register/',
                        data: user,
                        })
                        .then( res =>  {
                            setUser({
                                firstName: "",
                                lastName: "",
                                email: "",
                                username: "",
                                password: "",
                            })
                            setConfirmPass('');
                            localStorage.setItem('notif',JSON.stringify('Succesfully Registered.'));
                            props.history.push('/signin'); 
                        })
                        .catch(err => {
                            console.log(err)
                            toast.error('Invalid entry')
                        })
            }else{
                toast.error('Password Dont Match!')
            }
        }else{
            setIsError({...isError,
                firstName: user.firstName ? false : true,
                lastName: user.lastName ? false : true,
                email: user.email ? false : true,
                username: user.username ? false : true,
                password: user.password ? false : true,
                confirmPassword: confirmPass ? false : true,
              });
              toast.error('Empty Field!')
        }
    }

    return (
        <React.Fragment>
            <div className="App">
                <ToastContainer enableMultiContainer position={toast.POSITION.TOP_RIGHT} /> 
                <SideDiv link ='signin' name='Sign In'/>
                <div className='form'>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5">
                            Sign up
                            </Typography>
                            <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={user.firstName}
                                    onChange={e => handleUser(e)}
                                    helperText={isError.firstName ? "Required." : ""}
                                    error={isError.firstName}
                                />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    value={user.lastName}
                                    onChange={e => handleUser(e)}
                                    helperText={isError.lastName ? "Required." : ""}
                                    error={isError.lastName}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    type='email'
                                    autoComplete="email"
                                    value={user.email}
                                    onChange={e => handleUser(e)}
                                    helperText={isError.email ? "Required." : ""}
                                    error={isError.email}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    value={user.username}
                                    onChange={e => handleUser(e)}
                                    helperText={isError.username ? "Required." : ""}
                                    error={isError.username}
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
                                    value={user.password}
                                    onChange={e => handleUser(e)}
                                    helperText={isError.password ? "Required." : ""}
                                    error={isError.password}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmpassword"
                                    autoComplete="confirm-password"
                                    value={confirmPass}
                                    onChange={e => handleConPass(e)}
                                    helperText={
                                        isError.confirmPassword ? "Required." 
                                        : match ? "Incorrect entry."
                                        : ""}
                                    error={isError.confirmPassword ? true : match ? true : false}
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