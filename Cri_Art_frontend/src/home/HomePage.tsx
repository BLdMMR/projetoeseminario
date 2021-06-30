import { useRef } from "react"
import UserCredentials from '../auth/UserCredentials'
import './HomePage.css'
import { Api } from '../api/Api'
import Feed from "./Feed"

export interface HomeProps {
      creds: UserCredentials
      api: Api
}

function HomePage(props: HomeProps) {
      const searchRef = useRef<HTMLInputElement>(null)

      async function handleSearch() {
            const toSearchBy = searchRef.current?.value
            console.log(toSearchBy)
            const searchResponse = await props.api.fetchFromAPI(
                  'GET',
              `/public/home/search?nameToSearchBy=${toSearchBy}&token=${props.creds.token?.token}`
            )

            const searchResult = await searchResponse
            console.log(`Search Response: ${searchResponse}`)
            console.log(`Search Result: ${searchResult}`)
            console.log(searchResult)
            
            //Fetch from backend the search results
      }

      return props.creds.hasToken() ? (
            <div>
                  <h1>Feed</h1>
            </div>
      ) : 
      (
            <div className={'search-bar-home'}>
                  <input type="text" className="form-control" id="exampleFormControlInput1" ref={searchRef} />
                  {/* <input type="text" id='home_search_bar' ref={searchRef}/> */}
                  <button type="button" id='home_search_button' className="btn btn-outline-primary" onClick={handleSearch}>Search</button>

                  {/* <button type="button" id='home_search_button' onClick={handleSearch}>Search</button> */}
            </div>
      )
}

export default HomePage