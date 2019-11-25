import React, { Component } from 'react';
import LoginPageUsername from './LoginPage/LoginPageUsername';
import LoginPagePassword from './LoginPage/LoginPagePassword';
import axios from 'axios'

export default class MediaCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
            email: "",
            password: ""
            },
            step: 1,
        }
    }

    nextStep = () => {
        this.setState({
            step: this.state.step + 1
        });
    }

    prevStep = () => {
        this.setState({
            step: this.state.step - 1
        });
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
        console.log(this.state)
    }


    handleLogin = (e) => {
        e.preventDefault();
        axios({
            method: "post",
            url: `http://localhost:4000/login`,
            data: this.state.data
        })
            .then(e => {
                console.log(e)
                localStorage.setItem('usertoken', e.data.accessToken)
                this.props.history.push('/usermanager')
            })
            
            .catch(e => console.log(e))
    }

    render() {
        const { step } = this.state;

        switch (step) {
            case 1:
                return (
                    <LoginPageUsername
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                    />
                )
            case 2:
                return (
                    <LoginPagePassword
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleLogin={this.handleLogin}
                    />
                )
            default:
                break;
        }
    }
}
