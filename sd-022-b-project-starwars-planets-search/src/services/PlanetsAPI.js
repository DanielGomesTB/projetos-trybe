const ISS_BASE_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

const PlanetsAPI = async () => {
  const request = await fetch(ISS_BASE_API);
  const response = await request.json();
  const { results } = response;

  return results;
};

export default PlanetsAPI;
