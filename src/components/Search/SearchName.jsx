import React, { useContext, useCallback } from 'react';
import { contextCreate } from '../../Context/ContextApi';

function SearchName() {
  const { planets, setNames } = useContext(contextCreate);

  const handleChange = useCallback(({ target: { value } }) => {
    const valor = planets.filter((item) => (
      item.name.toLowerCase().includes(value.toLowerCase())
    ));
    setNames(valor);
  }, [planets, setNames]);

  return (
    <div>
      <h2>Projeto Start Wars - Trybe </h2>
      <label>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ handleChange }
        />
      </label>
    </div>
  );
}

export default SearchName;
