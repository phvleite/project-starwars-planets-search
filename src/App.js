import React from 'react';
import StarWarsProvider from './context/StarWarsProvider';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <StarWarsProvider>
      <Home />
    </StarWarsProvider>
  );
}

export default App;
