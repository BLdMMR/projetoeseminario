import React from 'react';
import './App.css';
import Navbar from './Navbar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App(){
	return (
		<>
		<Router>
			<Navbar></Navbar>
			<Switch>
				<Route path='/'>
					
					</Route>
			</Switch>
		</Router>

		</>
	);
	
}

export default App;