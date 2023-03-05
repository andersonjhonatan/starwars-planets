import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import MockData from './mockData'
import { act } from 'react-dom/test-utils';


describe ('Filtros numéricos', () => {

  beforeEach(async() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: async () =>  MockData ,

    }));
    render(<App />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);

        screen.getByText('Tatooine');
    });

  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Filtro numérico', async () => {


    const filterByNumeric = screen.getByTestId('column-filter');
    expect(filterByNumeric).toBeInTheDocument();

    const filterByCompa = screen.getByTestId('comparison-filter');
    expect(filterByCompa).toBeInTheDocument();

    const filterByV = screen.getByTestId('value-filter');
    expect(filterByV).toBeInTheDocument();

    const Button = screen.getByTestId('button-filter');
    expect(Button).toBeInTheDocument();

    const ButtRem = screen.getByTestId('button-remove-filters');
    expect(ButtRem).toBeInTheDocument();

  });

  it('Filtro por nome', async () => {

    const filterByName = screen.getByTestId('name-filter');
    userEvent.type(filterByName, 'Tatooine');

  await waitFor(() => {
    const PlanetNam = screen.getAllByTestId('planet-name')
    expect(PlanetNam).toHaveLength(1);
  });

});

  it('Filtro por coluna', async () => {


    const filterCol = screen.getByTestId('column-filter');
    expect(filterCol).toBeInTheDocument();
    expect(filterCol).toHaveValue('population');
    expect(filterCol).toHaveLength(5);

    userEvent.selectOptions(filterCol, 'orbital_period');
    expect(filterCol).toHaveValue('orbital_period');

    const filterByCompa = screen.getByTestId('comparison-filter');
    expect(filterByCompa).toBeInTheDocument();
    expect(filterByCompa).toHaveValue('maior que');
    expect(filterByCompa).toHaveLength(3);

    userEvent.selectOptions(filterByCompa, 'menor que');
    expect(filterByCompa).toHaveValue('menor que');

    const filterByV = screen.getByTestId('value-filter')
    expect(filterByV).toBeInTheDocument();
    expect(filterByV).toHaveValue(0);

    userEvent.type(filterByV, '305');

    const Button = screen.getByTestId('button-filter');
    expect(Button).toBeInTheDocument();
    userEvent.click(Button);

    await waitFor(() => {
      const PlanetNam = screen.getAllByTestId('planet-name');
      expect(PlanetNam).toHaveLength(1);
    });

    const ButtRem = screen.getByRole('button', { name: /X/i });
    expect(ButtRem).toBeInTheDocument();
    expect(filterCol).toHaveLength(4);
    expect(filterCol).toHaveValue('population');

    userEvent.click(ButtRem);

    expect(filterCol).toHaveLength(5);
    expect(filterCol).toHaveValue('population');
  });

  it('Botão de remover filtros', async () => {



    const Button = screen.getByTestId('button-filter');
    const ButtRem = screen.getByTestId('button-remove-filters');
    const filterCol = screen.getByTestId('column-filter');
    expect(filterCol).toBeInTheDocument();

    userEvent.selectOptions(filterCol, 'orbital_period');
    expect(filterCol).toHaveValue('orbital_period');

    const filterByCompa = screen.getByTestId('comparison-filter');

    userEvent.selectOptions(filterByCompa, 'menor que');
    expect(filterByCompa).toHaveValue('menor que');

    const filterByV = screen.getByTestId('value-filter');
    expect(filterByV).toBeInTheDocument();
    expect(filterByV).toHaveValue(0);


    userEvent.type(filterByV, '4000');

    userEvent.click(Button);


    userEvent.selectOptions(filterCol, 'surface_water');
    userEvent.selectOptions(filterByCompa, 'menor que');
    userEvent.type(filterByV, '100');
    userEvent.click(Button);

    userEvent.selectOptions(filterCol, 'population');
    userEvent.selectOptions(filterByCompa, 'maior que');
    userEvent.type(filterByV, '30000000');
    userEvent.click(Button);


    userEvent.selectOptions(filterCol, 'diameter');
    userEvent.selectOptions(filterByCompa, 'igual a');
    userEvent.type(filterByV, '0');
    userEvent.click(Button);

    await waitFor(() => {
      const PlanetNam =  screen.queryAllByTestId('planet-name')
      expect(PlanetNam).toHaveLength(0);
    });

    expect(filterCol).toHaveLength(1);

    userEvent.click(ButtRem);

    expect(filterCol).toHaveLength(5);

  });

  it('Verifica se é possível aplicar o filtro por coluna e nome', async () => {


      const PlanetNam = screen.getAllByTestId('planet-name');
      expect(PlanetNam).toHaveLength(10);

    const filterByName = screen.getByTestId('column-filter');
    userEvent.selectOptions(filterByName, 'orbital_period');
    expect(filterByName).toBeInTheDocument();

    const filterByV = screen.getByTestId('value-filter');
    userEvent.type(filterByV, '3');
    expect(filterByV).toBeInTheDocument();

    const filterByCompa = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(filterByCompa, 'maior que');
    expect(filterByCompa).toBeInTheDocument();

    const Button = screen.getByTestId('button-filter');
    userEvent.click(Button);
    expect(Button).toBeInTheDocument();


  const filter = screen.getByTestId('filter');
  expect(filter).toHaveTextContent(/orbital_period/i);


    const ButtRem = screen.getByRole('button', { name: /X/i });
    userEvent.click(ButtRem);

  });

  it('Verifica se ordena em ascendente e descendente', async () => {

    const btnOrder = screen.getByTestId('column-sort-button')

    const btnOrderAsc = screen.getByTestId('column-sort-input-asc')
    userEvent.click(btnOrderAsc)
    userEvent.click(btnOrder)

    const btnOrderDesc = screen.getByTestId('column-sort-input-desc')
    userEvent.click(btnOrderDesc)
    userEvent.click(btnOrder)

    userEvent.selectOptions(screen.getByTestId('column-sort'), 'orbital_period')

  });
})