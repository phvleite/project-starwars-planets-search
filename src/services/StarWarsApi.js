const STAR_WARS_API = 'https://swapi-trybe.herokuapp.com/api/planets/';
const STAR_WARS_FILMS_API = 'https://swapi-trybe.herokuapp.com/api/films/';

const getStarWarsApi = async () => {
  const response = await fetch(STAR_WARS_API);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

const getStarWarsFilmsApi = async () => {
  const response = await fetch(STAR_WARS_FILMS_API);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export { getStarWarsApi, getStarWarsFilmsApi };
