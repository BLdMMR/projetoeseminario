import {useEffect, useRef, useState} from "react"
import {Link, useHistory} from 'react-router-dom'
import logo from '../icons/new_logo.svg';
import './Header.css'
import {AuthService} from "../api/AuthService";
import {Api, HTTP_METHOD} from "../api/Api";

export default function Header(props: any) {

  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
      if (tags.length <= 0){
          Api.fetchFromAPI(
              HTTP_METHOD.GET,
              `/public/tags`,
              null
          ).then(tags => {
              if (tags) {
                  setTags(tags)
              }
          })
      }
  }, [tags, setTags])

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
            if (AuthService.hasProfile())
                history.push(`/artist/${AuthService.getId()}?token=${AuthService.getToken()}`)
            else history.push(`create-profile?token=${AuthService.getToken()}`)
        }
        else {
            history.push(`/settings?token=${AuthService.getToken()}`)
        }
    }

    function renderTag(tag: string) {
      return (
          <li><button className="dropdown-item" onClick={() => {history.push(`/search?tagToSearchBy=${tag}`)}}>{tag}</button></li>

      )
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
              <div className="btn-group">
                  <button type="button" className="btn btn-primary" data-bs-toggle="dropdown"
                          aria-expanded="false">
                      Search by tag
                  </button>
                  <ul className="dropdown-menu">
                      {tags.map(renderTag)}
                  </ul>
              </div>
          </div>
        <div className={"auth-section"}>
            <div className="btn-group">
                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Options
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <button type="button" id='profile' className="dropdown-item" onClick={handleProfile}>{AuthService.getType()=="ARTIST"?"My Profile":"Settings"}</button>
                    </li>
                    <li>
                        <button type="button" className="dropdown-item" onClick={handleProfile}>Messages</button>
                    </li>
                    <li><hr className="dropdown-divider"/></li>
                    <li>
                        <button type="button" className="dropdown-item" onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </div>
        {/*  <div className={'auth-section'}>*/}
        {/*      <button type="button" id='profile' className="btn btn-outline-primary" onClick={handleProfile}>{AuthService.getType()=="ARTIST"?"My Profile":"Settings"}</button>*/}
        {/*  </div>*/}
        {/*  <div className={'auth-section'}>*/}
        {/*      <button type="button" id='login-btn' className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>*/}
        {/*</div>*/}
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
