import React from 'react';
import './App.css';
import Navbar from './Navbar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Artists } from './Artist'

function App(){
	return (
		<>
		<Router>
			<Navbar></Navbar>
			<Switch>
				<Route path='/'>
					
					</Route>
					<Route path='/api/artist'>
						<Artists/>
					</Route>
			</Switch>
		</Router>

		</>
	);
	
}

export default App;