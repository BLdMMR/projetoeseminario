import React from 'react'
import logo from './logo_grayblue.svg'


function HomePage() {
    return(
        <div>
        <nav className='navbar'>
        <img src={logo} id='logo' alt="" />
        {/* <Navbar/> */}
        </nav>
        <form action="/home/search" method="get"></form>
        <input id='search'></input>
        <button type="submit">Search</button>
        </div>
    )
}

export default HomePage