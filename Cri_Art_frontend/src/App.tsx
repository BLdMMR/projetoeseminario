/* import React from 'react'; */
import AppRouter from './router/AppRouter';
import SearchResult from './search/SearchResult';
import './App.css';

const searchParams = new SearchResult()


export default function App() {
  return(
    <AppRouter></AppRouter>
  )
}

