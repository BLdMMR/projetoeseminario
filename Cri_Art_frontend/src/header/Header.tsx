import {Link} from 'react-router-dom'
import logo from '../icons/new_logo.svg';
import Credentials from '../auth/UserCredentials'
import './Header.css'
import minilogo from '../icons/logo_mini.svg'

interface HeaderProps {
  creds: Credentials
}

export function Header(props: HeaderProps) {
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
              <input type="text" id='search_bar' ref={undefined}/>
              <button type="button" onClick={undefined}>Search</button>
          </div>
          <div className={'auth-section'}>
            <form action="/login">
              <button type="submit">Logout</button>
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
            <button className={'auth-button'} type="submit">Login</button>
          </form>
          <form action="/signup">
            <button className={'auth-button'} type="submit">Sign Up</button>
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