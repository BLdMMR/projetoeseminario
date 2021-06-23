import React from 'react';
import logo from './new_logo.svg';
import { BrowserRouter as Router, Redirect, Link, Route, Switch } from 'react-router-dom'
import Header from './header/Header'
import HomePage from './home/HomePage'
import HelloPage from './HelloPage'
import AuthPage from './auth/AuthPage';

import './App.css';

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path='/'>
          <HomePage/>      
        </Route>
        <Route exact path='/search'>
          <HelloPage/>      
        </Route>
        <Route exact path='/login'>
          <AuthPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
