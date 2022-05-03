import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Nav from '../Components/Nav';
import { drinkObj } from './inputs';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import drinks from '../../cypress/mocks/drinks';

function renderNavComponent() {
  drinkObj.forEach((item) => {
    renderWithRouter(<Nav
      key={ item.strCategory }
      categoriesName={ item.strCategory }
      page="thecocktaildb"
      tipo="drinks"
    />);
  });
}

describe('Testa o componente "Nav"', () => {
  it('Verifica se o componente é renderizado corretamente', () => {
    renderNavComponent();
    const filterBtn1 = screen.getByRole('button', { name: /ordinary drink/i });
    const filterBtn2 = screen.getByRole('button', { name: /ordinary drink/i });
    const filterBtn3 = screen.getByRole('button', { name: /shake/i });
    const filterBtn4 = screen.getByRole('button', { name: /other\/unknown/i });
    const filterBtn5 = screen.getByRole('button', { name: /cocoa/i });
    expect(filterBtn1).toBeInTheDocument();
    expect(filterBtn2).toBeInTheDocument();
    expect(filterBtn3).toBeInTheDocument();
    expect(filterBtn4).toBeInTheDocument();
    expect(filterBtn5).toBeInTheDocument();
  });

  it('Testa os botões de filtro', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ordinaryDrinks.drinks),
    });
    renderNavComponent();

    await act(async () => {
      const filterBtn1 = await screen.findByRole('button', { name: /ordinary drink/i });
      fireEvent.click(filterBtn1);
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Testa se o filtro é removido após duplo clique', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks.drinks),
    });
    renderNavComponent();
    const filterBtn1 = await screen.findByRole('button', { name: /ordinary drink/i });
    await act(async () => {
      fireEvent.click(filterBtn1);
    });
    fireEvent.click(filterBtn1);
    expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });
});
