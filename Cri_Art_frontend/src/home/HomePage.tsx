import {useEffect, useRef, useState} from "react"
import './HomePage.css'
import {Api, HTTP_METHOD} from "../api/Api";
import {AuthService} from "../api/AuthService";


function HomePage(props: any) {
  const [hasFeed, setHasFeed] = useState<Boolean>(false)

  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (hasFeed == false) {
      Api.fetchFromAPI(
        HTTP_METHOD.GET,
        `/feed?token=${AuthService.getToken()}`,
        new Headers()
      )
      setHasFeed(true)
    }
  }, [hasFeed, setHasFeed])

  async function handleSearch() {
    const toSearchBy = searchRef.current?.value
    console.log(toSearchBy)
    const searchResponse = await Api.fetchFromAPI(
      HTTP_METHOD.GET,
      `/public/home/search?nameToSearchBy=${toSearchBy}&token=${AuthService.getToken()}`
    )

    const searchResult = await searchResponse
    console.log(`Search Response: ${searchResponse}`)
    console.log(`Search Result: ${searchResult}`)
    console.log(searchResult)

    //Fetch from backend the search results
  }

  return AuthService.getToken() && hasFeed ? (
      <div>
        <h1>Feed</h1>
      </div>
    ) :
    (
      <div className={'search-bar-home'}>
        <input type="text" className="form-control" id="exampleFormControlInput1" ref={searchRef}/>
        {/* <input type="text" id='home_search_bar' ref={searchRef}/> */}
        <button type="button" id='home_search_button' className="btn btn-outline-primary"
                onClick={handleSearch}>Search
        </button>

        {/* <button type="button" id='home_search_button' onClick={handleSearch}>Search</button> */}
      </div>
    )
}

export default HomePage