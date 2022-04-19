import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import TableStarWars from '../components/TableStarWars';

function Home() {
  const {
    requestStarWarsData,
    loading,
    filterByName,
    getFilterByName,
    dbFilterByName,
  } = useContext(StarWarsContext);

  useEffect(() => {
    requestStarWarsData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(filterByName);
  }, [filterByName]);

  useEffect(() => {
    console.log(dbFilterByName);
  }, [dbFilterByName]);

  return (
    <main>
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
      { loading ? (<h1>Carregando...</h1>) : (
        <TableStarWars />
      )}
    </main>
  );
}

export default Home;
