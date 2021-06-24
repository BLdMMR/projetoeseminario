/* import React from 'react'; */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './header/Header'
import HomePage from './home/HomePage'
import HelloPage from './HelloPage'
import AuthPage from './auth/AuthPage';
import UserCredentials from './auth/UserCredentials'

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
