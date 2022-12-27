import React, { useEffect, useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const {
    planets,
    filterByNumericValues,
    setfilterByNumericValues,
  } = useContext(PlanetsContext);
  const [filterPlanets, setFilterPlanets] = useState(planets);
  const [savePlanet, setSavePlanet] = useState('');
  const [saveSelectors, setSaveSelectors] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const findPlanet = () => {
    if (savePlanet === '') {
      return planets;
    }
    const planetsFind = planets.filter((planet) => planet.name
      .toLowerCase().includes(savePlanet.toLowerCase()));
    return planetsFind;
  };

  const filterNumeric = () => {
    let planet = filterPlanets;
    filterByNumericValues.forEach((element) => {
      planet = planet.filter((planetElement) => {
        if (element.comparison === 'maior que') {
          return Number(planetElement[element.column]) > Number(element.value);
        }
        if (element.comparison === 'menor que') {
          return Number(planetElement[element.column]) < Number(element.value);
        }
        return Number(planetElement[element.column]) === Number(element.value);
      });
    });
    setFilterPlanets(planet);
  };

  useEffect(() => {
    setFilterPlanets(findPlanet());
    if (filterByNumericValues.length !== 0) filterNumeric();
  }, [savePlanet, planets, filterByNumericValues]);

  const [saveOptions, setSaveOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  // código feito com ajuda do marcelo marques
  const filterDelete = () => {
    const filtered = saveOptions.filter((element) => element !== saveSelectors.column);
    setSaveOptions(filtered);
    setSaveSelectors({ ...saveSelectors, column: filtered[0] });
  };

  const handleClick = () => {
    setfilterByNumericValues(
      [...filterByNumericValues, { ...saveSelectors }],
    );
    filterDelete();
  };

  return (
    <div>
      <input
        data-testid="name-filter"
        onChange={ (
          { target },
        ) => setSavePlanet(target.value) }
      />
      <select
        data-testid="column-filter"
        name="column"
        value={ saveSelectors.column }
        onChange={ ({ target }) => setSaveSelectors(
          { ...saveSelectors, column: target.value },
        ) }
      >
        {saveOptions.map((element, index) => (
          <option key={ index } value={ element }>{element}</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ saveSelectors.comparison }
        onChange={ ({ target }) => setSaveSelectors(
          { ...saveSelectors, comparison: target.value },
        ) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="value"
        value={ saveSelectors.value }
        onChange={ ({ target }) => setSaveSelectors(
          { ...saveSelectors, value: target.value },
        ) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
      <p>Filtros</p>
      {filterByNumericValues.map((element, index) => (
        <p key={ index }>
          {`${element.column} ${element.comparison} ${element.value}`}
          {' '}
          <button type="button">Deletar</button>
        </p>

      ))}
      <table>
        <caption>Star Wars Planets</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Climate</th>
            <th>Created</th>
            <th>Diameter</th>
            <th>Edited</th>
            <th>Films</th>
            <th>Gravity</th>
            <th>Orbital Period</th>
            <th>Population</th>
            <th>Rotation Period</th>
            <th>Surface Water</th>
            <th>Terrain</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filterPlanets.map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.climate}</td>
              <td>{planet.created}</td>
              <td>{planet.diameter}</td>
              <td>{planet.edited}</td>
              <td>{planet.films}</td>
              <td>{planet.gravity}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.population}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.suface_water}</td>
              <td>{planet.terrain}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

// {filterByNumericValues.length === 0
//   ? <option value="population">population</option>
//   : filterByNumericValues.map((element, index) => element.column
//   !== 'population' && (
//     <option key={ index } value="population">population</option>
//   ))}
// {filterByNumericValues.length === 0
//   ? <option value="orbital_period">orbital_period</option>
//   : filterByNumericValues.map((element, index) => element.column
//   !== 'orbital_period' && (
//     <option key={ index } value="orbital_period">orbital_period</option>
//   ))}
// {filterByNumericValues.length === 0
//   ? <option value="diameter">diameter</option>
//   : filterByNumericValues.map((element, index) => element.column
//   !== 'diameter' && (
//     <option key={ index } value="diameter">diameter</option>
//   ))}
// {filterByNumericValues.length === 0
//   ? <option value="rotation_period">rotation_period</option>
//   : filterByNumericValues.map((element, index) => element.column
//   !== 'rotation_period' && (
//     <option key={ index } value="rotation_period">rotation_period</option>
//   ))}
// {filterByNumericValues.length === 0
//   ? <option value="surface_water">surface_water</option>
//   : filterByNumericValues.map((element, index) => element.column
//   !== 'surface_water' && (
//     <option key={ index } value="surface_water">surface_water</option>
//   ))}

export default Table;
