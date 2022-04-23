import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getStarWarsApi, getStarWarsFilmsApi } from '../services/StarWarsApi';
import StarWarsContext from './StarWarsContext';

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
        filterData = dbFilterByName
          .filter((planet) => parseInt(planet[col], 10) > valNumber)
          .map((planet) => planet);
      } else if (comp === 'menor que') {
        filterData = dbFilterByName
          .filter((planet) => parseInt(planet[col], 10) < valNumber)
          .map((planet) => planet);
      } else if (comp === 'igual a') {
        filterData = dbFilterByName
          .filter((planet) => parseInt(planet[col], 10) === valNumber)
          .map((planet) => planet);
      }
    }
    setDbFilterByName(filterData);
  }

  function getAllFilterByNumericValues(DataNumeric) {
    const filterDataNumeric = [...DataNumeric];
    filterDataNumeric.forEach((filter, ind) => {
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

  function filterDataByName(value) {
    console.log(filterByNumericValues.length);
    setLoading(true);
    const INDEX_OF = -1;
    // let filterData;

    // if (filterByNumericValues.length > 0) {
    //   getAllFilterByNumericValues(filterByNumericValues);
    // }

    const filterData = dbStarWars.filter((planet) => planet.name
      .toLowerCase().indexOf(value.toLowerCase()) !== INDEX_OF)
      .map((planet) => planet);

    // if (filterByNumericValues.length === 0) {
    //   filterData = dbStarWars.filter((planet) => planet.name
    //     .toLowerCase().indexOf(value.toLowerCase()) !== INDEX_OF)
    //     .map((planet) => planet);
    // } else if (filterByNumericValues.length > 0 && dbFilterByName.length === 0) {
    //   filterData = dbStarWars.filter((planet) => planet.name
    //     .toLowerCase().indexOf(value.toLowerCase()) !== INDEX_OF)
    //     .map((planet) => planet);
    //   setDbFilterByName(filterData);
    //   getAllFilterByNumericValues(filterByNumericValues);
    // } else {
    //   filterData = dbFilterByName.filter((planet) => planet.name
    //     .toLowerCase().indexOf(value.toLowerCase()) !== INDEX_OF)
    //     .map((planet) => planet);
    // }

    setDbFilterByName(filterData);
    setLoading(false);
  }

  function getFilterByNumericValues() {
    setLoading(true);
    const filterDataNumeric = [...filterByNumericValues];
    if (filterByNumericValues.length > 0) {
      const found = filterByNumericValues.find((elem) => elem.column === column);
      if (found) {
        filterByNumericValues.forEach((filter, ind) => {
          if (filter.column === column) {
            setFilterByNumericValues(
              [filterByNumericValues[ind] = { column, comparison, valueNumber }],
              filterDataNumeric[ind] = { column, comparison, valueNumber },
            );
          }
        });
      } else {
        setFilterByNumericValues([...filterByNumericValues,
          { column, comparison, valueNumber }]);
        filterDataNumeric.push(...filterByNumericValues,
          { column, comparison, valueNumber });
      }
    } else {
      setFilterByNumericValues([...filterByNumericValues,
        { column, comparison, valueNumber }]);
      filterDataNumeric.push(...filterByNumericValues,
        { column, comparison, valueNumber });
    }

    getAllFilterByNumericValues(filterDataNumeric);
    setLoading(false);
  }

  function removeFilterByNumericValues({ target }) {
    const { value } = target;
    filterByNumericValues.splice(value, 1);
    if (filterByNumericValues.length === 0) {
      setColumn('population');
      setComparison('maior que');
      setValueNumber(0);
      filterDataByName(filterByName);
    } else {
      getAllFilterByNumericValues(filterByNumericValues);
    }
  }

  function removeAllFilterByNumericValues() {
    filterByNumericValues.splice(0, filterByNumericValues.length);
    setColumn('population');
    setComparison('maior que');
    setValueNumber(0);
    filterDataByName(filterByName);
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
    dbTitleFilms,
    filterByNumericValues,
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
