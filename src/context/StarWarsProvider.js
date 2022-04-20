import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getStarWarsApi from '../services/StarWarsApi';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [dbStarWars, setDbStarWars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterByName, setFilterByName] = useState('');
  const [dbFilterByName, setDbFilterByName] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [valueNumber, setValueNumber] = useState(0);

  // solução encontrada nesta página: (https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript)
  function dynamicSort(property) {
    let sortOrder = 1;
    const oneLess = -1;

    if (property[0] === '-') {
      sortOrder = oneLess;
      property = property.substr(1);
    }

    return ((a, b) => {
      if (sortOrder === oneLess) {
        return b[property].localeCompare(a[property]);
      }
      return a[property].localeCompare(b[property]);
    });
  }

  async function requestStarWarsData() {
    setLoading(true);
    const data = await getStarWarsApi();
    const dataSort = data.results.sort(dynamicSort('name'));
    setDbStarWars(dataSort);
    setDbFilterByName(dataSort);
    setLoading(false);
  }

  function getDataToFilter({ target }) {
    const { name, value } = target;
    switch (name) {
    case 'column':
      setColumn(value);
      break;
    case 'comparison':
      setComparison(value);
      break;
    case 'valueNumber':
      setValueNumber(value);
      break;
    default:
    }
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
    column,
    comparison,
    valueNumber,
    requestStarWarsData,
    filterDataByName,
    getFilterByName,
    getDataToFilter,
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
