import React, { Component } from 'react';
import logo from './logo_grayblue.svg';
import './App.css';
import Navbar from './Navbar';
import HomePage from './HomePage';

class App extends Component  {
  render() {
    return (<>
      <div className="App" id='app'>
        <HomePage/>
      </div>  
      </>
    )
  }
}

/* function App() {
  return (<>
    <div className="App" id='app'>
      <HomePage/>
    </div>  
    </>
  )
  /* return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  ); 
} */

export default App;
