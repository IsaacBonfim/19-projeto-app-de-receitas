import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import oneDrink from '../../cypress/mocks/oneDrink';
import ExploreDrinks from '../Pages/ExploreDrinks';

describe('Testa o componente ExploreDrinks', () => {
  it('Verifica se o componente \'ExploreFood\' foi renderizado corretamente', () => {
    renderWithRouter(<ExploreDrinks />);
    const filter1 = screen.getByTestId('explore-by-ingredient');
    const filter2 = screen.getByTestId('explore-surprise');
    const title = screen.getByRole('heading', { name: /explore drinks/i });
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(filter1.innerHTML).toBe('By Ingredient');
    expect(filter2.innerHTML).toBe('Surprise me!');
    expect(profileIcon).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de profile, redireciona para a página de profile',
    () => {
      const { history } = renderWithRouter(<ExploreDrinks />);
      const profileBtn = screen.getByTestId('profile-top-btn');
      userEvent.click(profileBtn);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });
  it('Teste os filtros', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    const { history } = renderWithRouter(<ExploreDrinks />);
    const filter1 = screen.getByTestId('explore-by-ingredient');
    const filter2 = screen.getByTestId('explore-surprise');
    userEvent.click(filter1);
    expect(history.location.pathname).toBe('/explore/drinks/ingredients');
    renderWithRouter(<ExploreDrinks />);
    userEvent.click(filter2);
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  });
});
