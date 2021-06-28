/* import React from 'react'; */
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './header/Header'
import HomePage from './home/HomePage'
import HelloPage from './HelloPage'
import AuthPage from './auth/AuthPage';
import SignUpPage from './auth/SignUpPage';
import UserCredentials from './auth/UserCredentials'
import { Api } from './api/Api'

import './App.css';
import CreateArtistPage from './artist/CreateArtistPage';

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
      <Switch>
        <Route exact path='/'>
          <Redirect to='/home'/>
        </Route>
        <Route exact path='/home'>
          <Header creds={session}/>
          <HomePage creds={session} api={api}/>      
        </Route>
        <Route exact path='/search'>
          <Header creds={session}/>
          <HelloPage/>      
        </Route>
        <Route exact path='/login'>
          <Header creds={session}/>
          <AuthPage session={session}/>
        </Route>
        <Route exact path='/signup'>
          <Header creds={session}/> 
          <SignUpPage session={session}/>
        </Route>
        <Route exact path='/createartist'>
          <Header creds={session}/>
          <CreateArtistPage/>
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
