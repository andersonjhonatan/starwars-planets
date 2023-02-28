import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';

export const contextCreate = createContext();

function ContextApi({ children }) {
  const [planets, setPlanets] = useState();
  const [names, setNames] = useState([]);

  useEffect(() => {
    const api = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setPlanets(data.results);
      setNames(data.results);
    };
    api();
  }, []);

  return (
    <contextCreate.Provider value={ { planets, setNames, names } }>
      {children}
    </contextCreate.Provider>
  );
}

ContextApi.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextApi;
