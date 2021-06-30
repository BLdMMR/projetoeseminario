import { useRef } from "react"
import {Link} from 'react-router-dom'
import logo from '../icons/new_logo.svg';
import Credentials from '../auth/UserCredentials'
import './Header.css'
import minilogo from '../icons/logo_mini.svg'
import { Api } from '../api/Api';

interface HeaderProps {
  creds: Credentials
  api: Api
}

export function Header(props: HeaderProps) {
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

  console.log(props.creds.token != undefined)
  if (props.creds.token != undefined){
    return (
      <div className="App">
        <nav className={'navbar'}>
          <div className={'logo-section'}>
            <Link to="/home">
              <img src={logo} className="ui left mini image" alt="logo" id='logo'/>
            </Link>
          </div>
          <div className={'search-section'}>
            <input type="text" className="form-control" id="header-search-bar" ref={searchRef} />
            <button type="button" id='header_search_button' className="btn btn-primary" onClick={handleSearch}>Search</button>
          </div>
          <div className={'auth-section'}>
            <form action="/login">
              <button type="submit" id='login-btn' className="btn btn-outline-primary">Logout</button>
            </form>
          </div>
        </nav>
        <div className={'behind-header'}>
        </div>
      </div>
    )
  }

  /* <div className="App"> */
  return (
    <div>
      <nav className={'navbar'}>
        <div className={'logo-section'}>
          <Link to="/home">
            <img src={logo} className="ui left mini image" alt="logo" id='logo'/>
          </Link>
        </div>
        <div className={'auth-section'}>
          <form action="/login">
            <button type="submit" id='login-btn' className="btn btn-outline-primary">Login</button>

            {/* <button className={'auth-button'} type="submit">Login</button> */}
          </form>
          <form action="/signup">
            <button type="submit" id='sign-up-btn' className="btn btn-primary">Sign Up</button>

            {/* <button className={'auth-button'} type="submit">Sign Up</button> */}
          </form>
        </div>
      </nav>
      <div className={'behind-header'}>
      </div>
    </div>
  )
  /* </div> */
}

export default Header