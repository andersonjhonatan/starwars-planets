import React, { useContext, useCallback, useState, useEffect } from 'react';
import { contextCreate } from '../../Context/ContextApi';

function Filtered() {
  const {
    setSelect,
    select,
    twoFilter,
    setTwoFilter,
    setIsLoading } = useContext(contextCreate);

  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const handleClick = useCallback(() => {
    setTwoFilter([...twoFilter, select]);
    setOptions(options.filter((item) => item !== select.column));
    setIsLoading(true);
  }, [select, twoFilter, setTwoFilter, setIsLoading, options]);

  useEffect(() => {
    if (options.length) {
      setSelect((prevSelect) => ({
        ...prevSelect, column: options[0] }));
    }
  }, [setSelect, options]);

  return (
    <form>
      <select
        name="column"
        value={ select.column }
        data-testid="column-filter"
        onChange={ ({ target: { value } }) => setSelect({ ...select, column: value }) }
      >
        {options.map((item) => (
          <option key={ item } value={ item }>
            {item}
          </option>
        ))}
      </select>
      <select
        name="comparison"
        value={ select.comparison }
        data-testid="comparison-filter"
        onChange={ ({ target: { value } }) => setSelect({
          ...select, comparison: value }) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
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
      <button type="button" data-testid="button-filter" onClick={ handleClick }>
        Filtrar
      </button>
    </form>
  );
}

export default Filtered;
