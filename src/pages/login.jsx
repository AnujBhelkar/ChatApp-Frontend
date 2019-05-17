/*******************************************************************************
 * @Purpose : To create login page for login to the registered account.
 * @file    : login.jsx
 * @author  : Anuj
 * @version : v0.1
 * @since   :15-05-2019
 *******************************************************************************/
import React, { Component } from 'react'
//import AppBar from '@material-ui/core/AppBar'
import Login from '../components/login'
import "../App.css"
class login extends Component {
  render() {
    return (
      <div>
       
        <Login  props ={this.props}/> 
      </div>
    )
  }
}

export default login
