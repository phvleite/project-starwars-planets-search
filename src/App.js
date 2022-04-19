import React from 'react';
import StarWarsProvider from './context/StarWarsProvider';
// import TableStarWars from './components/TableStarWars';
import ManipulatingStarWars from './components/ManipulatingStarWars';
import './App.css';

function App() {
  return (
    <StarWarsProvider>
      <span>Hello, App Star Wars!</span>
      <ManipulatingStarWars />
      {/* <TableStarWars /> */}
    </StarWarsProvider>
  );
}

export default App;
