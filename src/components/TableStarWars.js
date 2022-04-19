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
  return (
    <table>
      <tbody>
        <tr>
          { headerTableStarWars.map((header, ind) => (
            <th key={ ind }>{ header }</th>
          )) }
        </tr>
        { dbFilterByName.map((planet, ind) => (
          <tr key={ ind }>
            <td>{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.films }</td>
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
