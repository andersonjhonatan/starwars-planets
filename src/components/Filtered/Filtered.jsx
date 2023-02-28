import React, { useContext, useCallback } from 'react';
import { contextCreate } from '../../Context/ContextApi';

function Filtered() {
  const {
    filtered,
    setFiltered,
    planets,
    setNames,
    setShouldRender,
  } = useContext(contextCreate);

  const handleClick = useCallback(() => {
    if (filtered.name && filtered.comparison && filtered.value) {
      if (filtered.comparison === 'maior que') {
        return planets.filter((item) => Number(item[filtered
          .name]) > Number(filtered.value));
      } if (filtered.comparison === 'menor que') {
        return planets.filter((item) => Number(item[filtered
          .name]) < Number(filtered.value));
      } if (filtered.comparison === 'igual a') {
        return planets.filter((item) => Number(item[filtered
          .name]) === Number(filtered
          .value));
      }
    }
    return planets;
  }, [filtered, planets]);

  const handleFilter = useCallback(() => {
    setNames(handleClick);
    setShouldRender(true);
  }, [handleClick, setNames, setShouldRender]);

  const handleChange = useCallback(({ target: { name, value } }) => {
    console.log(name, value);
    setFiltered((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, [setFiltered]);

  return (
    <form>
      <select
        name="name"
        value={ filtered.name }
        data-testid="column-filter"
        onChange={ handleChange }
      >
        <option value="population">
          population
        </option>
        <option value="orbital_period">
          orbital_period
        </option>
        <option value="diameter">
          diameter
        </option>
        <option value="rotation_period">
          rotation_period
        </option>
        <option value="surface_water">
          surface_water
        </option>
      </select>
      <select
        name="comparison"
        value={ filtered.comparison }
        data-testid="comparison-filter"
        onChange={ handleChange }
      >
        <option value="maior que">
          maior que
        </option>
        <option value="menor que">
          menor que
        </option>
        <option value="igual a">
          igual a
        </option>
      </select>
      <label>
        <input
          name="value"
          value={ filtered.value }
          type="number"
          data-testid="value-filter"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilter }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Filtered;
