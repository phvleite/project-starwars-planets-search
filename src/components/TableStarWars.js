import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../css/TableStarWars.css';

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
  const FIN_DTA = 10;

  const dbDtCreated = dbFilterByName
    .map((planet) => planet.created.slice(0, FIN_DTA).split('-'));

  const dbDtEdited = dbFilterByName
    .map((planet) => planet.edited.slice(0, FIN_DTA).split('-'));

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
            <td>
              {
                `${dbDtCreated[ind][2]}/${dbDtCreated[ind][1]}/${dbDtCreated[ind][0]}`
              }
            </td>
            <td>
              {
                `${dbDtEdited[ind][2]}/${dbDtEdited[ind][1]}/${dbDtEdited[ind][0]}`
              }
            </td>
            <td>{ planet.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableStarWars;
