import React, { Component } from 'react'

import Register from '../components/register'
import "../App.css"
class register extends Component {
  render() {
    return (
      <div>
        <Register props ={this.props} /> 
      </div>
    )
  }
}

export default register;