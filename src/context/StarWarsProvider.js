import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getStarWarsApi, getStarWarsFilmsApi } from '../services/StarWarsApi';
import StarWarsContext from './StarWarsContext';

let filterDataNext = [];

function StarWarsProvider({ children }) {
  const [dbStarWars, setDbStarWars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterByName, setFilterByName] = useState('');
  const [dbFilterByName, setDbFilterByName] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [valueNumber, setValueNumber] = useState(0);
  const [dbTitleFilms, setDbTitleFilms] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

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

  async function requestFilmsStarWarsData() {
    setLoading(true);
    const data = await getStarWarsFilmsApi();
    const titleFilms = data.results;
    const titles = titleFilms.map((film) => film.title);
    setDbTitleFilms(titles);
    setLoading(false);
  }

  function allFilterByNumericValues(col, comp, valNumber, ind) {
    let filterData;
    const lenData = filterByNumericValues.length;
    if (ind === 0) {
      if (comp === 'maior que') {
        filterData = dbStarWars
          .filter((planet) => parseInt(planet[col], 10) > valNumber)
          .map((planet) => planet);
      } else if (comp === 'menor que') {
        filterData = dbStarWars
          .filter((planet) => parseInt(planet[col], 10) < valNumber)
          .map((planet) => planet);
      } else if (comp === 'igual a') {
        filterData = dbStarWars
          .filter((planet) => parseInt(planet[col], 10) === valNumber)
          .map((planet) => planet);
      }
    } else if (ind > 0) {
      if (comp === 'maior que') {
        filterData = filterDataNext
          .filter((planet) => parseInt(planet[col], 10) > valNumber)
          .map((planet) => planet);
      } else if (comp === 'menor que') {
        filterData = filterDataNext
          .filter((planet) => parseInt(planet[col], 10) < valNumber)
          .map((planet) => planet);
      } else if (comp === 'igual a') {
        filterData = filterDataNext
          .filter((planet) => parseInt(planet[col], 10) === valNumber)
          .map((planet) => planet);
      }
    }
    if (ind + 1 === lenData) {
      filterDataNext = [];
    } else {
      filterDataNext = [...filterData];
    }
    setDbFilterByName(filterData);
  }

  function getAllFilterByNumericValues() {
    filterByNumericValues.forEach((filter, ind) => {
      allFilterByNumericValues(filter.column, filter.comparison, filter.valueNumber, ind);
    });
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
      setValueNumber(parseInt(value, 10));
      break;
    default:
    }
  }

  function filterDataByName() {
    setLoading(true);
    const INDEX_OF = -1;

    const filterData = dbStarWars.filter((planet) => planet.name
      .toLowerCase().indexOf(filterByName.toLowerCase()) !== INDEX_OF)
      .map((planet) => planet);

    setDbFilterByName(filterData);
    setLoading(false);
  }

  function getFilterByNumericValues() {
    setLoading(true);
    if (filterByNumericValues.length > 0) {
      const found = filterByNumericValues.find((elem) => elem.column === column);
      if (found) {
        filterByNumericValues.forEach((filter, ind) => {
          if (filter.column === column) {
            setFilterByNumericValues(
              [filterByNumericValues[ind] = { column, comparison, valueNumber }],
            );
          }
        });
      } else {
        setFilterByNumericValues([...filterByNumericValues,
          { column, comparison, valueNumber }]);
      }
    } else {
      setFilterByNumericValues([...filterByNumericValues,
        { column, comparison, valueNumber }]);
    }
    setLoading(false);
  }

  function removeFilterByNumericValues({ target }) {
    const { value } = target;
    const filters = [...filterByNumericValues];
    filters.splice(value, 1);
    setFilterByNumericValues(filters);
    if (filters.length === 0) {
      setColumn('population');
      setComparison('maior que');
      setValueNumber(0);
      filterDataByName();
    }
  }

  function removeAllFilterByNumericValues() {
    const filters = [...filterByNumericValues];
    filters.splice(0, filters.length);
    setFilterByNumericValues(filters);
    setColumn('population');
    setComparison('maior que');
    setValueNumber(0);
    filterDataByName();
  }

  function getFilterByName({ target }) {
    const { value } = target;
    setFilterByName(value);
  }

  const contexValue = {
    dbStarWars,
    loading,
    filterByName,
    dbFilterByName,
    column,
    comparison,
    valueNumber,
    dbTitleFilms,
    filterByNumericValues,
    getAllFilterByNumericValues,
    requestFilmsStarWarsData,
    requestStarWarsData,
    filterDataByName,
    getFilterByName,
    getDataToFilter,
    getFilterByNumericValues,
    removeFilterByNumericValues,
    removeAllFilterByNumericValues,
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
