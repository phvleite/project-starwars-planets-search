import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function ManipulatingStarWars() {
  const {
    dbStarWars,
    requestStarWarsData,
    loading,
  } = useContext(StarWarsContext);

  useEffect(() => {
    requestStarWarsData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(dbStarWars);
  }, [dbStarWars]);

  return (
    <main>
      Filtros, buscas e ordem
      { loading ? (<h1>Carregando...</h1>) : (
        <h1>Banco de dados pronto</h1>
      )}
    </main>
  );
}

export default ManipulatingStarWars;
