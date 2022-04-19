import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getStarWarsApi from '../services/StarWarsApi';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [dbStarWars, setDbStarWars] = useState([]);
  const [loading, setLoading] = useState(false);

  async function requestStarWarsData() {
    setLoading(true);
    const data = await getStarWarsApi();
    setDbStarWars(data.results);
    setLoading(false);
  }

  const contexValue = {
    dbStarWars,
    loading,
    requestStarWarsData,
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
