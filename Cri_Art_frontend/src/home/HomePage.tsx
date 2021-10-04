import {useEffect, useRef, useState} from "react"
import {Redirect, useHistory} from "react-router-dom";
import './HomePage.css'
import bg from './background.svg'
import {Api, HTTP_METHOD} from "../api/Api";
import {AuthService} from "../api/AuthService";
import FeedPage from "./FeedPage"
import SearchBar from "../search/SearchBar";

function HomePage(props: any) {

  return AuthService.getToken() ? (
      <div>
        <FeedPage/>
      </div>
    ) :
    (
        <div>
        <div className={"home-page"} >
            <SearchBar location={"home"}/>
        </div>
          <p></p>
        </div>
    )
}

export default HomePage