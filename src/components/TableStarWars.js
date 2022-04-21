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
  const { dbFilterByName } = useContext(StarWarsContext);
  const filmsStarWars = dbFilterByName.map((planet) => planet.films);
  return (
    <table>
      <tbody>
        <tr className="header-line">
          { headerTableStarWars.map((header, ind) => (
            <th key={ ind }>{ header }</th>
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
                <p
                  key={ `${planet.name}-${idx}` }
                >
                  <a
                    href={ planetFilm }
                    target="_blank"
                    rel="noreferrer"
                  >
                    { planetFilm }
                  </a>
                </p>
              ))}
            </td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>
              <a
                href={ planet.url }
                target="_blank"
                rel="noreferrer"
              >
                { planet.url }
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableStarWars;
