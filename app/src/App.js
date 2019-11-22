import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom'

import Routes from './router';

function App() {
  return (
    <HashRouter>
    <Routes/>
    </HashRouter>
  );
}

export default App;
