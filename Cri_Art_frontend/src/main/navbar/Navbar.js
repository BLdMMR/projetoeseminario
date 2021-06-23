import  React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../button/Button';
import './Navbar.css';

function Navbar() {
	const [click, setClick] = useState(false);
	const Clickhandler = () => setClick(!click);
	const closedmenu= () => setClick(false);
	const [button, setButton] = useState(true);

	const showButton = () => {
		if(window.innerWidth <= 960) {
			setButton(false);
		} else {
			setButton(true);
		}
	}
	useEffect(() => {
		showButton();
	}, [])
	window.addEventListener('resize', showButton);

	return(<>
	<nav className='navbar'>
	<div className='navbar-stuff'>
	<Link to="/" className='logo' onClick={closedmenu}>
		Cri_Art
		<i className='fab fa-typo3' />
	</Link>
	<div className='menu' onClick={Clickhandler}>
		<i className={click ? 'fas fa-times' : 'fas fa-bars'} />
	</div>
	   <ul className={click ? 'menu-active' : 'menu-inactive'} >
		   <li className='navItem'>
		   <Link to="/" className='navLinks' onClick={closedmenu}>
			Home
			</Link>
		   </li>
		   <li className='navItem'>
		   <Link to="/login" className='navLinksclosed' onClick={closedmenu}>
			Login
			</Link>
		   
		   </li>
	   </ul>
	   {button && <Button>Log in</Button>}
	</div>
	</nav>
	</>
	);
}

export default Navbar;