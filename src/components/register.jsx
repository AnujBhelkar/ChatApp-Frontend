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
import Snackbar from '@material-ui/core/Snackbar'
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
        e.preventDefault();

        if(this.state.firstName.length === 0){
            this.setState({
                openSnackBar  : true,
                snackBarMessage : "First name Cannot be Empty..!!"
            })            
        }
        else if(this.state.firstName.length < 3){
            this.setState({
                openSnackBar  : true,
                snackBarMessage : "First name Cannot be Less than 3 character..!!"
            })            
        }
        else if(this.state.lastName.length === 0){
            this.setState({
                openSnackBar  : true,
                snackBarMessage : "Last name Cannot be Empty..!!"
            })            
        }
        else if(this.state.lastName.length < 3){
            this.setState({
                openSnackBar  : true,
                snackBarMessage : "Last name Cannot be Less Than 3 character..!!"
            })            
        }
        else if(this.state.email.length === 0){
            this.setState({
                openSnackBar  : true,
                snackBarMessage : "Email Cannot be Empty..!!"
            })            
        }
        else if(!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)){
            this.setState({
                openSnackBar  : true,
                snackBarMessage : "Invalid Email..!!"
            })
        }
        else if(this.state.password.length === 0){
            this.setState({
                openSnackBar  : true,
                snackBarMessage : "Password Cannot be Empty..!!"
            })            
        }
        else if(this.state.password.length < 6){
            this.setState({
                openSnackBar  : true,
                snackBarMessage : "Password length is greater than 6..!!"
            })            
        }
        else{
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
                    this.setState({
                        openSnackBar : true,
                        snackBarMessage : " Registration Successfully !!",
                    })
                })
                .catch((err) => {
                    console.log(err)
                    this.setState({
                        openSnackBar : true,
                        snackBarMessage : "User Already Exist !!"
                    })
                })
            }    
    }
    /**
     * use to auto close Snack Bar
     */
    handleSnackClose = () =>{
        this.setState ({
            openSnackBar : false
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
                    <Snackbar
                        anchorOrigin = { { 
                            vertical    : 'bottom',
                            horizontal  : 'left',
                        }}
                        open = {this.state.openSnackBar}
                        autoHideDuration = {6000}
                        onClose = {this.state.handleSnackBarClose}
                        varient = "error"
                        ContentProps = {{
                                'aria-describedby' : 'message_id',
                        } }
                        message = {<span id = "message_id">{this.state.snackBarMessage}</span>}
                        action = {
                            [
                                <div key = "undo">
                                    <Button key = "undo" color = "primary" size = "small" onClick = {this.handleSnackClose}>
                                        Undo
                                    </Button>
                                </div>
                            ]
                        }                        
                    />
                </div>        
            </form>
        </div> 
    )
 }
}

export default Register;