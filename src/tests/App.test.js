import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import MockData from './mockData';
import { act } from 'react-dom/test-utils';


describe ('Verifica se é possível aplicar os filtros numéricos', () => {

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

  it('Verifica se é numérico', async () => {

    const filterByNume = screen.getByTestId('column-filter');
    const filCompa = screen.getByTestId('comparison-filter');
    const filByVa = screen.getByTestId('value-filter');
    const button = screen.getByTestId('button-filter');
    const ButtRem = screen.getByTestId('button-remove-filters');

    expect(filterByNume).toBeInTheDocument();

    expect(filCompa).toBeInTheDocument();

    expect(filByVa).toBeInTheDocument();

    expect(button).toBeInTheDocument();

    expect(ButtRem).toBeInTheDocument();

  });

  it('Verifica se é possível aplicar o filtro por nome', async () => {

    const filterName = screen.getByTestId('name-filter');
    userEvent.type(filterName, 'Tatooine');

  await waitFor(() => {
    const PlaneTName = screen.getAllByTestId('planet-name')
    expect(PlaneTName).toHaveLength(1);
  });

});

  it('Verifica se é possível aplicar o filtro por coluna', async () => {

    const filCompa = screen.getByTestId('comparison-filter');
    const filtColumn = screen.getByTestId('column-filter');
    const filByVa = screen.getByTestId('value-filter')
    const button = screen.getByTestId('button-filter');
    const ButtRem = screen.getByRole('button', { name: /X/i });
    
    expect(filtColumn).toBeInTheDocument();
    expect(filtColumn).toHaveValue('population');
    expect(filtColumn).toHaveLength(5);

    userEvent.selectOptions(filtColumn, 'orbital_period');
    expect(filtColumn).toHaveValue('orbital_period');

    expect(filCompa).toBeInTheDocument();
    expect(filCompa).toHaveValue('maior que');
    expect(filCompa).toHaveLength(3);

    userEvent.selectOptions(filCompa, 'menor que');
    expect(filCompa).toHaveValue('menor que');

    expect(filByVa).toBeInTheDocument();
    expect(filByVa).toHaveValue(0);

    userEvent.type(filByVa, '305');

    expect(button).toBeInTheDocument();
    userEvent.click(button);

    await waitFor(() => {
      const PlanetsName = screen.getAllByTestId('planet-name');
      expect(PlanetsName).toHaveLength(1);
    });

    expect(ButtRem).toBeInTheDocument();
    expect(filtColumn).toHaveLength(4);
    expect(filtColumn).toHaveValue('population');

    userEvent.click(ButtRem);

    expect(filtColumn).toHaveLength(5);
    expect(filtColumn).toHaveValue('population');
  });

  it('Verifica o botão de remover filtros', async () => {

    const button = screen.getByTestId('button-filter');
    const ButtRem = screen.getByTestId('button-remove-filters');
    const filtColumn = screen.getByTestId('column-filter');
    const filCompa = screen.getByTestId('comparison-filter');
    const filByVa = screen.getByTestId('value-filter');
    expect(filtColumn).toBeInTheDocument();

    userEvent.selectOptions(filtColumn, 'orbital_period');
    expect(filtColumn).toHaveValue('orbital_period');

    userEvent.selectOptions(filCompa, 'menor que');
    expect(filCompa).toHaveValue('menor que');

    expect(filByVa).toBeInTheDocument();
    expect(filByVa).toHaveValue(0);


    userEvent.type(filByVa, '4000');

    userEvent.click(button);

    userEvent.selectOptions(filtColumn, 'surface_water');
    userEvent.selectOptions(filCompa, 'menor que');
    userEvent.type(filByVa, '100');
    userEvent.click(button);

    userEvent.selectOptions(filtColumn, 'population');
    userEvent.selectOptions(filCompa, 'maior que');
    userEvent.type(filByVa, '30000000');
    userEvent.click(button);

    userEvent.selectOptions(filtColumn, 'diameter');
    userEvent.selectOptions(filCompa, 'igual a');
    userEvent.type(filByVa, '0');
    userEvent.click(button);

    await waitFor(() => {
      const PlanetsName =  screen.queryAllByTestId('planet-name')
      expect(PlanetsName).toHaveLength(0);
    });

    expect(filtColumn).toHaveLength(1);

    userEvent.click(ButtRem);

    expect(filtColumn).toHaveLength(5);

  });

  it('Verifica se é possível aplicar o filtro por coluna', async () => {

    const PlanetsName = screen.getAllByTestId('planet-name');
    const filterName = screen.getByTestId('column-filter');
    const filByVa = screen.getByTestId('value-filter');
    const filCompa = screen.getByTestId('comparison-filter');
    const button = screen.getByTestId('button-filter');
    const filter = screen.getByTestId('filter');
    const ButtRem = screen.getByRole('button', { name: /X/i });

    expect(PlanetsName).toHaveLength(10);
    userEvent.selectOptions(filterName, 'orbital_period');
    expect(filterName).toBeInTheDocument();
    userEvent.type(filByVa, '3');
    expect(filByVa).toBeInTheDocument();
    userEvent.selectOptions(filCompa, 'maior que');
    expect(filCompa).toBeInTheDocument();
    userEvent.click(button);
    expect(button).toBeInTheDocument();

    expect(filter).toHaveTextContent(/orbital_period/i);
    userEvent.click(ButtRem);

  });

  it('Verifica se ordena em ascendente e descendente', async () => {

    const btnOrder = screen.getByTestId('column-sort-button')
    const btnOrderAsc = screen.getByTestId('column-sort-input-asc')
    const btnOrderDesc = screen.getByTestId('column-sort-input-desc')

    userEvent.click(btnOrderAsc)
    userEvent.click(btnOrder)

    userEvent.click(btnOrderDesc)
    userEvent.click(btnOrder)

    userEvent.selectOptions(screen.getByTestId('column-sort'), 'orbital_period')

  });



})