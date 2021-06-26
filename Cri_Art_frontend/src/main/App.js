import React from 'react';
import './App.css';
import Navbar from './navbar/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Artists from './artist/Artist'

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/artist'>
					<Artists/>
				</Route>
				<Route path='artist/:id'>
					<Artists/>
				</Route>
				<Route path='/'>
					<Navbar/>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;