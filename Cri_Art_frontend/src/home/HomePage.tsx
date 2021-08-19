import {useEffect, useRef, useState} from "react"
import {Redirect, useHistory} from "react-router-dom";
import './HomePage.css'
import bg from './background.svg'
import {Api, HTTP_METHOD} from "../api/Api";
import {AuthService} from "../api/AuthService";
import FeedPage from "./FeedPage"


function HomePage(props: any) {
  const history = useHistory()
  const searchRef = useRef<HTMLInputElement>(null)

  async function handleSearch() {
    const toSearchBy = searchRef.current?.value
    console.log(toSearchBy)
    history.push(`search?nameToSearchBy=${toSearchBy}`)
    // const searchResponse = await Api.fetchFromAPI(
    //   HTTP_METHOD.GET,
    //   `/public/home/search?nameToSearchBy=${toSearchBy}&token=${AuthService.getToken()}`
    // )
    //
    // const searchResult = await searchResponse
    // console.log(`Search Response: ${searchResponse}`)
    // console.log(`Search Result: ${searchResult}`)
    // console.log(searchResult)

    //Fetch from backend the search results
  }

  return AuthService.getToken()? (
      <div>
        <FeedPage/>
      </div>
    ) :
    (
        <div>
        <div className={"home-page"} >
        {/*<img id={"backg"} src={bg}/>*/}
          <div className={'search-bar-home'}>
            <input type="text" className="form-control" id="exampleFormControlInput1" ref={searchRef}/>
        {/* <input type="text" id='home_search_bar' ref={searchRef}/> */}
            <button type="button" id='home_search_button' className="btn btn-primary"
                onClick={handleSearch}>Search
            </button>
          </div>
        </div>
          <p></p>
        </div>
    )
}

export default HomePage