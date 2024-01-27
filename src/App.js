import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';

import Navbar from './Components/Navbar';
import Games from './Components/Games';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="games" element={<Games />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
