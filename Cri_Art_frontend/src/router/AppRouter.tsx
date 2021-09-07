import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Header from "../header/Header";
import HomePage from "../home/HomePage";
import Login from "../auth/login/Login";
import Signup from "../auth/signup/Signup";
import SearchPage from "../search/SearchPage";
import SignupConfirmation from "../auth/signup/SignupConfirmation";
import ProfileCreation from "../artist/ProfileCreation"
import ArtistProfile from "../artist/ArtistProfile";
import Chat from "../chat/Chat";

export default function AppRouter() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/home'/>
        </Route>
        <Route exact path='/home'>
          <Header/>
          <Chat/>
          <HomePage/>
        </Route>
        <Route exact path='/login'>
          <Header/>
          <Login/>
        </Route>
        <Route exact path='/signup'>
          <Header/>
          <Signup/>
        </Route>
        <Route path="/search">
          <Header/>
          <Chat/>
          <SearchPage/>
        </Route>
        <Route exact path='/signup-confirmation'>
          <Header/>
          <SignupConfirmation/>
        </Route>
        <Route path="/create-profile">
          <Header/>
          <ProfileCreation/>
        </Route>
        <Route path={"/artist/:aid"}>
          <Header/>
          <Chat/>
          <ArtistProfile/>
        </Route>
      </Switch>
      {/*<h1>RANDOM</h1>*/}
      {/*<button className={"search-bar-home"} onClick={() => console.log(AuthService.getRndm())}/>*/}
    </BrowserRouter>
  );
}