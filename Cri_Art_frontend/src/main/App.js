import React from 'react';
import './App.css';
import Navbar from './navbar/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Artist from './artist/Artist'

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/artist'>
					<Artist/>
				</Route>
				<Route path='/'>
					<Navbar/>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;