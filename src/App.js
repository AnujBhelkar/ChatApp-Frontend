/*************************************************************************************
 * @Purpose : Here we import all the pages by using specific path.
 * @file    : App.js
 * @author  : Anuj
 * @version : v0.1
 * @since   : 14-05-2019 
 *************************************************************************************/
import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import login from './pages/login'
import register from './pages/register'
import dashboard from './pages/dashboard'
import './App.css';

class App extends Component{
  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <Route exact path="/" component={login}></Route>
            <Route path="/login" component={login}></Route>
            <Route path="/register" component={register}></Route>
            <Route path="/dashboard" component={dashboard}></Route>
          </div>
        </Router>        
     </div>
    );
  }
}

export default App
