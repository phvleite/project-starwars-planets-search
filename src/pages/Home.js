import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import TableStarWars from '../components/TableStarWars';
import StarWarsPlanetImg from '../images/star-wars-planets-search.png';
import '../css/Home.css';

function Home() {
  const {
    filterByNumericValues,
    dbTitleFilms,
    requestStarWarsData,
    requestFilmsStarWarsData,
    loading,
    filterByName,
    getFilterByName,
    getDataToFilter,
    column,
    comparison,
    valueNumber,
    getFilterByNumericValues,
    removeFilterByNumericValues,
    removeAllFilterByNumericValues,
  } = useContext(StarWarsContext);

  useEffect(() => {
    requestStarWarsData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    requestFilmsStarWarsData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log(dbTitleFilms);
  }, [dbTitleFilms]);

  const selectedColumn = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const isDisabled = filterByNumericValues.length === 0;

  const selectedColumnFilter = [...selectedColumn];
  if (filterByNumericValues.length > 0) {
    filterByNumericValues.forEach((elem) => {
      selectedColumnFilter.splice(selectedColumnFilter.indexOf(elem.column), 1);
    });
  }

  const selectedOperator = [
    'maior que',
    'menor que',
    'igual a',
  ];

  return (
    <main>
      <img src={ StarWarsPlanetImg } alt="Logo Star Wars Planet Searchs" />
      <section className="box-filter-name">
        <label htmlFor="input-filter-name">
          Projeto Star Wars - Trybe
          <input
            id="input-filter-name"
            data-testid="name-filter"
            name="name-filter"
            type="text"
            value={ filterByName }
            onChange={ getFilterByName }
            placeholder="filtro por nome do planeta"
          />
        </label>
      </section>
      <section className="box-filter-numerics">
        <label htmlFor="column-filter">
          Coluna
          <select
            id="column-filter"
            data-testid="column-filter"
            name="column"
            value={ column }
            onChange={ getDataToFilter }
          >
            {selectedColumnFilter.map((select) => (
              <option key={ select } value={ select }>{select}</option>
            ))}
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operador
          <select
            id="comparison-filter"
            data-testid="comparison-filter"
            name="comparison"
            value={ comparison }
            onChange={ getDataToFilter }
          >
            {selectedOperator.map((select) => (
              <option key={ select } value={ select }>{select}</option>
            ))}
          </select>
        </label>
        <label htmlFor="value-filter">
          Valor
          <input
            id="value-filter"
            data-testid="value-filter"
            name="valueNumber"
            type="number"
            value={ valueNumber }
            onChange={ getDataToFilter }
          />
        </label>
        <button
          data-testid="button-filter"
          className="button-filter"
          type="button"
          onClick={ getFilterByNumericValues }
        >
          Filtrar
        </button>
        <button
          data-testid="button-remove-filters"
          className="button-filter"
          type="button"
          disabled={ isDisabled }
          onClick={ removeAllFilterByNumericValues }
        >
          Remover Filtros
        </button>
      </section>
      <section className="box-numeric-filters">
        { filterByNumericValues.length > 0
          ? filterByNumericValues.map((filter, ind) => (
            <div key={ ind } className="box-numeric-filter">
              <p>
                {`Filtro: ${filter.column} ${filter.comparison} ${filter.valueNumber}`}
              </p>
              <button
                data-testid="filter"
                // className="button-filter"
                type="button"
                value={ ind }
                onClick={ removeFilterByNumericValues }
              >
                X
              </button>
            </div>
          ))
          : '' }
      </section>
      { loading ? (<h1>Carregando...</h1>) : (
        <TableStarWars />
      )}
    </main>
  );
}

export default Home;
