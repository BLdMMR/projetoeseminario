/* import React from 'react'; */
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './header/Header'
import HomePage from './home/HomePage'
import HelloPage from './HelloPage'
import Login from './auth/login/Login';
import Signup from './auth/signup/Signup';
import SignupConfirmation from './auth/signup/SignupConfirmation';
import UserCredentials from './auth/UserCredentials'
import { Api } from './api/Api'
import SearchPage from './search/SearchPage'
import SearchResult from './search/SearchResult';

import './App.css';
import { useState } from 'react';

const session = new UserCredentials()
const searchParams = new SearchResult()
const api = new Api()
session.setApi(api);

function AppRouter() {
  /* const [session, setSession] = useState<UserCredentials>()

  setSession(new UserCredentials()) */

  function printSession() {
    console.log(session)
  }

  function printParams(){
    console.log(searchParams)
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/home'/>
        </Route>
        <Route exact path='/home'>
          <Header creds={session} params={searchParams}/>
          <HomePage creds={session} api={api}/>      
        </Route>
        <Route exact path='/login'>
          <Header creds={session} params={searchParams}/>
          <Login session={session} />
        </Route>
        <Route exact path='/signup'>
          <Header creds={session} params={searchParams}/> 
          <Signup session={session}/>
        </Route>
        <Route path="/search">
          <Header creds = {session} params={searchParams}/>
          <SearchPage creds = {session} params={searchParams}/>
        </Route>
        <Route exact path='/signup-confirmation'>
          <Header creds={session} params={searchParams}/>
          <SignupConfirmation creds={session}/>
        </Route>
      </Switch>
      Debug<button onClick={printSession}>Print Session</button>
      {/*Debug<button onClick={printParams}>Print Params</button>*/}
    </Router>
  );
}

function App() {
  return(
    <AppRouter></AppRouter>
  )
}

export default App;
