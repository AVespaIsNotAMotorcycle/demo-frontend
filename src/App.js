import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
} from 'react-router-dom';

import './App.css';

import Navbar from './Components/Navbar';
import Games from './Components/Games';

function GamePage() {
  const { name } = useParams();
  return <h1>{name}</h1>
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        // For a different home page, do:
        // <Route index element={<Login />} />
        <Route path="games" element={<Games />} />
        <Route path="games/:name" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
