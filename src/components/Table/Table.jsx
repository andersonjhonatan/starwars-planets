import { useContext } from 'react';
import { contextCreate } from '../../Context/ContextApi';

function Table() {
  const { names, twoFilter, loading } = useContext(contextCreate);

  const tratarDados = () => {
    const filtername = names.filter((item) => {
      const filterPLanets = twoFilter.map(({ column, comparison, values }) => {
        switch (comparison) {
        case 'maior que':
          return Number(item[column]) > Number(values);
        case 'menor que':
          return Number(item[column]) < Number(values);
        case 'igual a':
          return Number(item[column]) === Number(values);
        default:
          return true;
        }
      });
      return filterPLanets.every((el) => el);
    });
    return filtername;
  };

  return (
    <div>
      {loading
        && twoFilter.map(({ column, comparison, values }, index) => (
          <div key={ index }>
            <span>
              {column}
              {comparison}
              {values}
            </span>
          </div>
        ))}
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Rotation Period</th>
            <th scope="col">Orbital Period</th>
            <th scope="col">Diameter</th>
            <th scope="col">Climate</th>
            <th scope="col">Gravity</th>
            <th scope="col">Terrain</th>
            <th scope="col">Surface Water</th>
            <th scope="col">Population</th>
            <th scope="col">Films</th>
            <th scope="col">Created</th>
            <th scope="col">Edited</th>
            <th scope="col">URL</th>
          </tr>
        </thead>
        <tbody>
          { tratarDados()
            .map((item) => (
              <tr key={ item.name }>
                <td>{item.name}</td>
                <td>{item.rotation_period}</td>
                <td>{item.orbital_period}</td>
                <td>{item.diameter}</td>
                <td>{item.climate}</td>
                <td>{item.gravity}</td>
                <td>{item.terrain}</td>
                <td>{item.surface_water}</td>
                <td>{item.population}</td>
                <td>{item.films}</td>
                <td>{item.created}</td>
                <td>{item.edited}</td>
                <td>{item.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
