import {useEffect, useRef, useState} from "react"
import {Link, useHistory} from 'react-router-dom'
import logo from '../icons/new_logo.svg';
import './Header.css'
import {AuthService} from "../api/AuthService";

export default function Header(props: any) {

  const [state, setState] = useState({})

  useEffect(() => {

  }, [state, setState])

  const searchRef = useRef<HTMLInputElement>(null)
  const history = useHistory()

  async function HandleSearch() {
        const toSearchBy = searchRef.current?.value
        console.log(toSearchBy)
        history.push(`/search?nameToSearchBy=${toSearchBy}`)
  }

  function handleLogout() {
    AuthService.logout()
        .then(response => {
            if (response) {
                console.log("Logging out")
                AuthService.removeInfo()
                history.push("/login")
            }
        })
  }

    function handleProfile() {
        if(AuthService.getType()=="ARTIST"){
            history.push(`/artist/${AuthService.getId()}?token=${AuthService.getToken()}`)
        }
        else {
            history.push(`/settings?token=${AuthService.getToken()}`)
        }
    }

    if (AuthService.getToken() != undefined){
    return (
      <div className="App">
        <nav className={'navbar'}>
          <div className={'logo-section'}>
            <Link to={`/home?token=${AuthService.getToken()}`}>
              <img src={logo} className="ui left mini image" alt="logo" id='logo'/>
            </Link>
          </div>
          <div className={'search-section'}>
            <input type="text" className="form-control" id="header-search-bar" ref={searchRef} />
            <button type="button" id='header_search_button' className="btn btn-primary" onClick={HandleSearch}>Search</button>
          </div>
            <div>
          <div className={'auth-section'}>
              <button type="button" id='profile' className="btn btn-outline-primary" onClick={handleProfile}>{AuthService.getType()=="ARTIST"?"My Profile":"Settings"}</button>
          </div>
          <div className={'auth-section'}>
              <button type="button" id='login-btn' className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>
          </div>
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
      <div className={'navbar-unauthenticated'}>
        <div className={'logo-section-unauthenticated'}>
          <Link to="/home">
            <img src={logo} className="img-fluid" alt="logo" id='logo'/>
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
