import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import TableStarWars from '../components/TableStarWars';

function Home() {
  const {
    requestStarWarsData,
    loading,
    filterByName,
    getFilterByName,
  } = useContext(StarWarsContext);

  useEffect(() => {
    requestStarWarsData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedColumn = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const selectedOperator = [
    'maior que',
    'menor que',
    'igual a',
  ];

  return (
    <main>
      <section className="box-filter-name">
        <label htmlFor="input-filter-name">
          Projeto Star Wars - Trybe
          <input
            id="input-filter-name"
            data-testid="name-filter"
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
            // value={ filterByName }
            // onChange={ getFilterByName }
          >
            {selectedColumn.map((select) => (
              <option key={ select } value={ select }>{select}</option>
            ))}
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operador
          <select
            id="comparison-filter"
            data-testid="comparison-filter"
            // value={ filterByName }
            // onChange={ getFilterByName }
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
            type="number"
            // value={ filterByName }
            // onChange={ getFilterByName }
          />
        </label>
        <button
          data-testid="button-filter"
          className="button-filter"
          type="button"
          // onClick={ this.deleteExpense }
        >
          Filtrar
        </button>
      </section>
      { loading ? (<h1>Carregando...</h1>) : (
        <TableStarWars />
      )}
    </main>
  );
}

export default Home;
