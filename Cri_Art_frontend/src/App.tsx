import React, { Component } from 'react';
import './App.css';
//import Navbar from './Navbar';
import HomePage from './HomePage';



function App () {
    return (<>
      <div className="App" id='app'>
        <HomePage id="banana" user="slam banana" arvore="Super slam banana"/>
      </div>  
      </>
    )
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
