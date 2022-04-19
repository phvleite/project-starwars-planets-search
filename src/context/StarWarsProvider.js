import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getStarWarsApi from '../services/StarWarsApi';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [dbStarWars, setDbStarWars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterByName, setFilterByName] = useState('');
  const [dbFilterByName, setDbFilterByName] = useState([]);

  async function requestStarWarsData() {
    setLoading(true);
    const data = await getStarWarsApi();
    setDbStarWars(data.results);
    setDbFilterByName(data.results);
    setLoading(false);
  }

  function filterDataByName(value) {
    setLoading(true);
    const INDEX_OF = -1;
    const filterData = dbStarWars.filter((planet) => planet.name
      .toLowerCase().indexOf(value.toLowerCase()) !== INDEX_OF)
      .map((planet) => planet);
    setDbFilterByName(filterData);
    setLoading(false);
  }

  // .slice(0, lenFilter).toLowerCase() === value.toLowerCase())

  function getFilterByName({ target }) {
    const { value } = target;
    setFilterByName(value);
    filterDataByName(value);
  }

  const contexValue = {
    dbStarWars,
    loading,
    filterByName,
    dbFilterByName,
    requestStarWarsData,
    filterDataByName,
    getFilterByName,
  };

  return (
    <StarWarsContext.Provider value={ contexValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
