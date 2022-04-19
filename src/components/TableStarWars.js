import React from 'react';
import StarWarsContext from '../context/StarWarsContext';

function TableStarWars() {
  return (
    <StarWarsContext.Consumer>
      <main>
        Tabela Star Wars
        {
          (dbStarWars.map((planet) => (
            <p key={ planet.name }>{planet.name}</p>
          )))
        }
      </main>
    </StarWarsContext.Consumer>
  );
}

export default TableStarWars;
