/*******************************************************************************
 * @Purpose : To create dashboard page for show all chats.
 * @file    : dashboard.jsx
 * @author  : Anuj
 * @version : v0.1
 * @since   :18-05-2019
 *******************************************************************************/
import React, { Component } from 'react'
import Dashboard from '../components/dashboard'
import "../App.css"
class dashboard extends Component {
  render() {
    return (
      <div>    
        <Dashboard  props ={this.props}/> 
      </div>
    )
  }
}

export default dashboard