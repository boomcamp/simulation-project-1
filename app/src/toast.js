import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircle from '@material-ui/icons/CheckCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: '#a5c556'
    },
    warning: {
        backgroundColor: '#9a0707'
    },
    yellow: {
        backgroundColor: '#d8d450'
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: theme.spacing(2),
        marginTop: '2px',
        color: '#d8d8d8'
    },
    warnIcon: {
        fontSize: 20,
        opacity: 1,
        marginRight: theme.spacing(2),
        marginTop: '2px',
        color: '#fff'
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    }
}));

export default function Toast(props) {
    const classes = useStyles();
    let icon, color;
    if (props.toastType === "check") {
        icon = <CheckCircle className={classes.icon} />
        color = classes.success
    }
    else if (props.toastType === "success") {
        icon = <CircularProgress className={classes.icon} />
        color = classes.success
    }
    else if (props.toastType === "warning") {
        icon = <WarningIcon className={classes.warnIcon} />
        color = classes.yellow
    }
    else if (props.toastType === "caution") {
        icon = <WarningIcon className={classes.icon} />
        color = classes.warning
    }
    return (
        <Snackbar
            anchorOrigin={{
                vertical: props.vertical,
                horizontal: props.horizontal,
            }}
            open={props.open}
            autoHideDuration={3000}
            onClose={props.handleClose}
            ContentProps={{
                'aria-describedby': 'message-id',
                classes: { root: color }
            }}
            message={
                <span id="message-id" className={classes.message}>
                    {icon}
                    {props.message}
                </span>
                }
            />
    );
}
