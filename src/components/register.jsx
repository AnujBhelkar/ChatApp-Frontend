/*******************************************************************************
 * @Purpose : To create register page for Registeration to the registered account.
 * @file    : login.jsx
 * @author  : Anuj
 * @version : v0.1
 * @since   :14-05-2019
 *******************************************************************************/


import React, { Component } from 'react'
import 'react-dom'
import {userRegister} from '../services/userService'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import "../App.css"
class Register extends Component {
    constructor(props){
        super(props)
        this.state={
            firstName   :  "",
            lastName    :  "",
            email       :  "",
            password    :  ""
        }
        this.baseState = this.state;
    }
     
    handleFirstNameChange = event =>{
        const firstName = event.target.value;
        this.setState({firstName : firstName})
    } 
    handleLastNameChange = event =>{
        const lastName = event.target.value;
        this.setState({lastName : lastName})
    } 
    handleEmailChange = event =>{
        const email = event.target.value;
        this.setState({email : email})
    } 
    handlePasswordChange = event =>{
        const password = event.target.value;
        this.setState({password : password})
    } 
    showLoginBox = e => {
        e.preventDefault();
        this.props.props.history.push("/login");
      }
      showRegisterBox = e => {
        e.preventDefault();
        this.props.props.history.push("/register");
      }


    handleSubmit = e => {
        var data ={
            firstName : this.state.firstName,
            lastName  : this.state.lastName,
            email     : this.state.email,
            password  : this.state.password
        }   
        userRegister(data)  
        //console.log(data)
            .then((response) => {
                console.log(response)
                console.log("Registration Successfully ");
            })
            .catch((err) => {
                console.log(err)
                console.log(" Email Already Exists ");
            })
    }

 render() {
    return (
        //<h1>Welcome Reg</h1>

        <div>
            <div className = "mainBox">
                <Card className = "box">
                    <div className = "LoginSpan"   onClick = {this.showLoginBox} >
                        Login
                    </div>
                    <div className = "RegisterSpan"  onClick = {this.showRegisterBox}>
                        Register
                    </div>
                </Card>
            </div>
            <form>

                <div className = "forShadow">
                    <div className="container"> 
                        <Card className = "LoginBox" >
                            <div className = "register-box-header">
                                Register
                            </div>
                            <div className = "textUserName">
                                <TextField
                                label="First Name"
                                name ="firstName" 
                                value = {this.state.firstName}
                                onChange = {this.handleFirstNameChange.bind(this)}
                                margin="dense"
                                autoComplete = "firstName"
                                varient = "filled"
                                />
                            </div>
                            <div className = "textUserName">
                            <TextField
                            label="Last Name"
                            name = "lastName"
                            value = {this.state.lastName}
                            onChange = {this.handleLastNameChange.bind(this)}
                            margin="dense"
                            autoComplete = "lastName"
                            varient = "filled"
                            />
                            </div>
                            <div className = "textUserName">
                            <TextField
                                label="Email"
                                name = "Email"
                                margin="dense"
                                type = "email"
                                value = {this.state.email}
                                onChange = {this.handleEmailChange.bind(this)}
                                autoComplete = "Email"
                                varient = "filled"
                            />
                            </div>
                            <div className = "textPassword">
                            <TextField
                                label="Pasword"
                                name = "Password"
                                margin="dense"
                                type = "password"
                                value = {this.state.password}
                                onChange = {this.handlePasswordChange.bind(this)}
                                autoComplete = "Password"
                                varient = "filled"
                            />
                            </div>
                            <div className = "registerButton">
                                <Button variant="contained" color="secondary" onClick ={this.handleSubmit}>
                                    Register
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>        
            </form>
        </div> 
    )
 }
}

export default Register;