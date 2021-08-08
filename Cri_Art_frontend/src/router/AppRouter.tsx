import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Header from "../header/Header";
import HomePage from "../home/HomePage";
import Login from "../auth/login/Login";
import Signup from "../auth/signup/Signup";
import SearchPage from "../search/SearchPage";
import SignupConfirmation from "../auth/signup/SignupConfirmation";
import ProfileCreation from "../artist/ProfileCreation"

export default function AppRouter() {

  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/home'/>
        </Route>
        <Route exact path='/home'>
          <HomePage/>
        </Route>
        <Route exact path='/login'>
          <Login/>
        </Route>
        <Route exact path='/signup'>
          <Signup/>
        </Route>
        <Route path="/search">
          <SearchPage/>
        </Route>
        <Route exact path='/signup-confirmation'>
          <SignupConfirmation/>
        </Route>
        <Route path="/create-profile">
          <ProfileCreation/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}