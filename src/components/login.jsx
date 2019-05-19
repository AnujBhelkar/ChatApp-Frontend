/*******************************************************************************
 * @Purpose : To create login page for login to the registered account.
 * @file    : login.jsx
 * @author  : Anuj
 * @version : v0.1
 * @since   :14-05-2019
 *******************************************************************************/

import React, { Component } from 'react'
import {userLogin} from '../services/userService'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
//import Snackbar from '@material-ui/core/Snackbar'
import '../App.css'
import { Snackbar } from '@material-ui/core';
class login extends Component {
    constructor(props){
      super(props)
        this.state ={
          email           : "",
          password        : "",
          SnackBarMessage : ''
         }
        
    }
    /**
     * Take the registered email Id
     */
    handleEmail = event =>{
      const email = event.target.value;
      this.setState({email : email})
    }
    /**
     * Take the registered User Password
     */
    handlePassword = event => {
      const password = event.target.value;
      this.setState({ password : password})
    }
    showRegisterBox = e =>{
      e.preventDefault();
      this.props.props.history.push("/register");
    }
    showLoginBox = e =>{
      e.preventDefault();
      this.props.props.history.push("/login");
    }
    /**
     * It will Submit the login page and check all the conditions
     */
    onHandleLogin = e => {
      e.preventDefault();
      if(!this.state.email){
          this.setState({
            openSnackbar : true,
            SnackBarMessage : "Username Cannot Be Empty !!"
          });
      }
      else if(!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)){
        this.setState({
          openSnackbar    : true,
          SnackBarMessage : 'Invalid Username !!'
          })
        }
      else if(!this.state.password){
        this.setState({
          openSnackbar    : true,
          SnackBarMessage : 'Username Cannot Be Empty !!'
          })
        }
      else if(this.state.password.length < 6){
        this.setState({
          openSnackbar    : true,
          SnackBarMessage : 'Password Must Be atleast 6 character long'
          })
        }
      else{
        var data = {
          email : this.state.email,
          password : this.state.password
        }
          userLogin(data)
            .then((response) => {
              console.log("Login Successfully")
              this.setState({
                  openSnackbar    : true,
                  SnackBarMessage : 'Login Successfully !!' 
              })
              localStorage.setItem('Sender',this.state.email)
              this.props.props.history.push('/dashboard')
            })
            .catch((err) =>{
              console.log(err)
              this.setState({
                openSnackbar    : true,
                SnackBarMessage : 'Login Failed !!' 
            })
            })
      }
    }
    /**
     * Use Auto CLose Snackbar
     */
    handleSnackClose = () => {
        this.setState({
          openSnackbar : false
        })
    }
  render() {

    return (
    
      <div>
          <div className = "mainBox">
            <Card className = "box">
              <div className = "LoginSpan "   onClick = {this.showLoginBox} >
                Login
              </div>
              <div className = 'RegisterSpan '  onClick = {this.showRegisterBox}>
                Register
              </div>
            </Card>
          </div>  
    
            <div className = "forShadow">
              <Card className = "LoginBox" >
              <form>
                  <div className = "login-box-header">
                    Login
                  </div>
                <div className = "textUserName">
                  <TextField
                    label="Email"
                    name = "UserName"
                    margin="dense"
                    value = {this.state.value}
                    onChange = {this.handleEmail.bind(this)}
                    autoComplete = "UserName"
                  />
                </div>
                <div className = "textPassword">
                  <TextField
                    label="Pasword"
                    name = "Password"
                    margin="dense"
                    type = "password"
                    value = {this.state.value}
                    autoComplete = "Password"
                    onChange = {this.handlePassword.bind(this)}
                  />
                </div>
                <div className = "loginButton">
                  <Button variant="contained" color="secondary" onClick = {this.onHandleLogin.bind(this)}>
                      Login
                  </Button>
                </div>
                </form>
              </Card>
            </div>
            <Snackbar
                anchorOrigin = {{
                  vertical    : 'bottom',
                  horizontal  : 'left',
                }}
                open = { this.state.openSnackbar}
                autoHideDuration = {6000}                
                onClose = {this.handleSnackClose}
                variant = 'error'
                ContentProps ={{
                    "aria-describedby" : 'message-id',
                  }}
                message = {<span id ='message-id'>{this.state.SnackBarMessage}</span>}
                action = {[
                    <div key = 'undo'>
                      <Button key = 'undo' coor ='primary' size ='small' onClick = {this.handleSnackClose}>
                          Undo
                      </Button>
                    </div>
                ]}
            />
            
      </div>
    )
  }
}

export default login
