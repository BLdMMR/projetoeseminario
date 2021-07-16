import {useEffect, useRef, useState} from "react"
import {Link, useHistory} from 'react-router-dom'
import logo from '../icons/new_logo.svg';
import Credentials from '../auth/UserCredentials'
import './Header.css'
import minilogo from '../icons/logo_mini.svg'
import { Api } from '../api/Api';
import SearchResult from "../search/SearchResult";

interface HeaderProps {
  creds: Credentials
  params: SearchResult
}

export default function Header(props: HeaderProps) {

  const [state, setState] = useState({})

  useEffect(() => {

    return () => {

    }
  })

  const searchRef = useRef<HTMLInputElement>(null)
  const history = useHistory()

  async function HandleSearch() {
        const toSearchBy = searchRef.current?.value
        console.log(toSearchBy)
        //props.params.setResults(toSearchBy)
        history.push(`/search?nameToSearchBy=${toSearchBy}`)
        

        /* const searchResponse = await props.creds.api?.fetchFromAPI(
              'GET',
          `/public/home/search?nameToSearchBy=${toSearchBy}&token=${props.creds.token?.token}`,
          undefined,
          undefined
        )

        const searchResult = await searchResponse
        console.log(`Search Response: ${searchResponse}`)
        console.log(`Search Result: ${searchResult}`)
        console.log(searchResult)
        props.params.setResults(searchResult.artistlist, searchResult.worklist) */
        /* props.params.artistlist = searchResult.artistlist
        props.params.worklist = searchResult.worklist */
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
            <button type="button" id='header_search_button' className="btn btn-primary" onClick={HandleSearch}>Search</button>
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
      <div className={'navbar'}>
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
      </div>
      <div className={'behind-header'}>
      </div>
    </div>
  )
  /* </div> */
}
