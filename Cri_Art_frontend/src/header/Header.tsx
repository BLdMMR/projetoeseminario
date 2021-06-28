import {Link} from 'react-router-dom'
import logo from '../icons/new_logo.svg';
import Credentials from '../auth/UserCredentials'
import './Header.css'
import minilogo from '../icons/logo_mini.svg'

interface HeaderProps{
      creds: Credentials
}

export function Header(props: HeaderProps) {
      if (props.creds.token?.token) 
            return(
            <div className="App" >
                  <nav className='navbar'>
                        <Link to = "/home">
                              <img src={logo} className="ui left mini image" alt="logo" id='logo'/>  
                        </Link>
                        <form action="/login">
                              <button type="submit">Logout</button>
                        </form>
                  </nav>
            </div>
            )

      return (
            <div className="App" >
                  <nav className='navbar'>
                        <Link to = "/home">
                              <img src={logo} className="ui left mini image" alt="logo" id='logo'/>  
                        </Link>
                  <form action="/login">
                        <button type="submit">Login</button>
                  </form>
                  <form action="/signup">
                        <button type="submit">Sign Up</button>
                  </form>
                  </nav>
            </div>
      )
}

export default Header