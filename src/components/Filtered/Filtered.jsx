import React, { useContext, useCallback } from 'react';
import { contextCreate } from '../../Context/ContextApi';

function Filtered() {
  const {
    setSelect,
    select,
    twoFilter,
    setTwoFilter,
    setIsLoading,
  } = useContext(contextCreate);

  const handleClick = useCallback(() => {
    setTwoFilter([...twoFilter, select]);
    setIsLoading(true);
  }, [select, twoFilter, setTwoFilter,
    setIsLoading]);

  return (
    <form>
      <select
        name="column"
        value={ select.column }
        data-testid="column-filter"
        onChange={ ({ target: { value } }) => setSelect({ ...select, column: value }) }
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
        value={ select.comparison }
        data-testid="comparison-filter"
        onChange={ ({ target: { value } }) => setSelect({ ...select,
          comparison: value }) }
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
          name="values"
          value={ select.values }
          type="number"
          data-testid="value-filter"
          onChange={ ({ target: { value } }) => setSelect({ ...select, values: value }) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Filtered;
