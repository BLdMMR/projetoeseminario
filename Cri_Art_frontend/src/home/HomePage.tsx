import { useRef } from "react"
import './HomePage.css'

function HomePage() {
      const searchRef = useRef<HTMLInputElement>(null)

      function handleSearch() {
            const toSearchBy = searchRef.current?.value
            console.log(toSearchBy)

            //Fetch from backend the search results
      }

      return (
            <div>
                  <input type="text" id='search_bar' ref={searchRef}/>
                  <button type="button" onClick={handleSearch}>Search</button>
            </div>
      )
}

export default HomePage