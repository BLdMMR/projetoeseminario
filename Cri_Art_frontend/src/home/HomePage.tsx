import { useRef } from "react"
import UserCredentials from '../auth/UserCredentials'
import './HomePage.css'
import { Api } from '../api/Api'

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
                  `/home/search?nameToSearchBy=${toSearchBy}&token=${props.creds.token?.token}` 
            )

            const searchResult = await searchResponse
            console.log(`Search Response: ${searchResponse}`)
            console.log(`Search Result: ${searchResult}`)

            //Fetch from backend the search results
      }

      return props.creds.hasToken() ? (
            <div>
                  <h1>FEED</h1>
            </div>
      ) : 
      (
            <div>
                  <input type="text" id='search_bar' ref={searchRef}/>
                  <button type="button" onClick={handleSearch}>Search</button>
            </div>
            
      )
}

export default HomePage