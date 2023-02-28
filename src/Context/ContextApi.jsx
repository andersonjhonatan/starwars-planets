import PropTypes from 'prop-types';
import React, { createContext, useEffect, useMemo, useState } from 'react';

export const contextCreate = createContext();

function ContextApi({ children }) {
  const [planets, setPlanets] = useState([]);
  const [names, setNames] = useState([]);
  const [filtered, setFiltered] = useState({
    name: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const api = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const planetas = data.results;
      setPlanets(planetas);
      setNames(planetas);
      setShouldRender(true);
    };
    api();
  }, []);

  const context = useMemo(() => ({
    planets,
    setNames,
    names,
    setFiltered,
    filtered,
    shouldRender,
    setShouldRender,
  }), [planets,
    setNames,
    names,
    setFiltered,
    filtered,
    shouldRender,
    setShouldRender]);

  return (
    <contextCreate.Provider
      value={ context }
    >
      {children}
    </contextCreate.Provider>
  );
}

ContextApi.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextApi;
