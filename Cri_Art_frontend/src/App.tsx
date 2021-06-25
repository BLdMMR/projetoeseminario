/* import React from 'react'; */
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './header/Header'
import HomePage from './home/HomePage'
import HelloPage from './HelloPage'
import AuthPage from './auth/AuthPage';
import UserCredentials from './auth/UserCredentials'
import { Api } from './api/Api'

import './App.css';
import { useEffect, useState } from 'react';

const session = new UserCredentials()
const api = new Api()
session.setApi(api);

function AppRouter() {

  /* const [session, setSession] = useState<UserCredentials>()

  setSession(new UserCredentials()) */

  function printSession() {
    console.log(session)
  }

  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/home'/>
        </Route>
        <Route exact path='/home'>
          <HomePage creds={session} api={api}/>      
        </Route>
        <Route exact path='/search'>
          <HelloPage/>      
        </Route>
        <Route exact path='/login'>
          <AuthPage session={session}/>
        </Route>
      </Switch>
      {/*Debug*/}<button onClick={printSession}>Print Session</button>
    </Router>
  );
}

function App() {
  return(
    <AppRouter></AppRouter>
  )
}

export default App;
