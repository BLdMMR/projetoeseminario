import React from 'react'
import logo from './new_logo_small.svg'
import login from './login.svg'


function HomePage() {
    return(
        <div>
        <nav className='navbar'>
            <img src={logo} id='logo' alt="" />
            <img src={login} id ='login' alt=''/>
        {/* <Navbar/> */}
        </nav>
        <form action="/home/search" method="get"></form>
            <input id='search'></input>
        <button type="submit">Search</button>
        </div>
    )
}

export default HomePage