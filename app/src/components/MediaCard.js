import React, { Component } from 'react';
import LoginPageUsername from './LoginPage/LoginPageUsername';
import LoginPagePassword from './LoginPage/LoginPagePassword';
import axios from 'axios'

export default class MediaCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            email: "",
            password: "",
            username: "",
            firstname: "",
            lastname: ""
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
            [e.target.name]: e.target.value
        });
        console.log(this.state)
    }


    handleLogin = (e) => {
        e.preventDefault();
        axios({
            method: "GET",
            url: `http://localhost:4000/users`,
            headers: { Authorization: `Bearer` }
        })
            .then(e => console.log(e.data))
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
                    />
                )
            default:
                break;
        }
    }
}
