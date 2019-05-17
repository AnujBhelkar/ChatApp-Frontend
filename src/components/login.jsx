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
import '../App.css'
class login extends Component {
    constructor(props){
      super(props)
        this.state ={
          email : "",
          password : ""
        }
        
    }
    handleEmail = event =>{
      const email = event.target.value;
      this.setState({email : email})
    }
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
    onHandleLogin = e => {
      var data = {
        email : this.state.email,
        password : this.state.password
      }
        userLogin(data)
          .then((response) => {
            console.log("Login Successfully")
          })
          .catch((err) =>{
            console.log(err)
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
                    label="User Name"
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
            
      </div>
    )
  }
}

export default login
