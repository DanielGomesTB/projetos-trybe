import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import PlanetsAPI from '../services/PlanetsAPI';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByNumericValues, setfilterByNumericValues] = useState([]);

  const planetsGet = async () => {
    const getPlanets = await PlanetsAPI();
    setPlanets(getPlanets);
  };

  useEffect(() => {
    planetsGet();
  }, []);

  const context = { planets, filterByNumericValues, setfilterByNumericValues };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.func,
}.isRequired;

export default PlanetsProvider;
