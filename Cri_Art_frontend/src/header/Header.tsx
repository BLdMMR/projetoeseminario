import {Link} from 'react-router-dom'
import logo from '../new_logo.svg';
import './Header.css'


export function Header() {
      return (
            <div className="App" >
                  <nav className='navbar'>
                        <Link to = "/">
                              <img src={logo} className="ui left mini image" alt="logo" id='logo'>  
                              </img>
                        </Link>

                  <form action="/login">
                        <button type="submit">Login</button>
                  </form>
                  </nav>
            </div>
      )
}

export default Header