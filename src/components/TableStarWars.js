import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const headerTableStarWars = [
  'Name',
  'Rotation Period',
  'Orbital Period',
  'Diameter',
  'Climate',
  'Gravity',
  'Terrain',
  'Surface Water',
  'Population',
  'Films',
  'Created',
  'Edited',
  'URL',
];

function TableStarWars() {
  const { dbFilterByName, dbTitleFilms } = useContext(StarWarsContext);
  const filmsStarWars = dbFilterByName.map((planet) => planet.films);
  const INI = 44;
  const FIN = 45;

  // if (filmsStarWars.length > 0) {
  //   filmsStarWars
  //     .forEach((film) => (
  //       film.forEach((f) => (console.log(dbTitleFilms[(f.slice(INI, FIN)) - 1])))));
  // }

  return (
    <table>
      <tbody>
        <tr className="header-line">
          { headerTableStarWars.map((header, ind) => (
            <th key={ `${header}-${ind}` }>{ header }</th>
          )) }
        </tr>
        { dbFilterByName.map((planet, ind) => (
          <tr key={ ind } className="data-line">
            <td>{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>
              { filmsStarWars[ind].map((planetFilm, idx) => (
                <p key={ `${planet.name}-${idx}` }>
                  { dbTitleFilms[planetFilm.slice(INI, FIN) - 1] }
                </p>
              ))}
            </td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableStarWars;
