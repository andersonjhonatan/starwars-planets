import PropTypes from 'prop-types';
import React, { createContext, useEffect, useMemo, useState } from 'react';

export const contextCreate = createContext();

function ContextApi({ children }) {
  const [removeItem, setRemoveItem] = useState([]);
  const [shouldRender, setShouldRender] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [twoFilter, setTwoFilter] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [names, setNames] = useState([]);
  const [select, setSelect] = useState({
    column: 'population',
    comparison: 'maior que',
    values: '0',
  });
  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

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
    twoFilter,
    setTwoFilter,
    setSelect,
    select,
    shouldRender,
    setShouldRender,
    loading,
    setIsLoading,
    setOptions,
    options,
    removeItem,
    setRemoveItem,
  }), [planets,
    setNames,
    names,
    select,
    setSelect,
    shouldRender,
    setShouldRender,
    loading,
    setIsLoading,
    twoFilter,
    setTwoFilter,
    setOptions,
    options,
    removeItem,
    setRemoveItem,
  ]);

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
