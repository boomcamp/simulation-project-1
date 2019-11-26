import React, { useState }from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignInForm(props) {
        let token = JSON.parse(localStorage.getItem('token'));
        return{token}
}

export default SignInForm
