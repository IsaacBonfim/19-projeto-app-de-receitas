import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExploreFood from '../Pages/ExploreFoods';
import renderWithRouter from './renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';

describe('Testa o componente \'ExploreFood\'', () => {
  it('Verifica se o componente \'ExploreFood\' foi renderizado corretamente', () => {
    renderWithRouter(<ExploreFood />);
    const filter1 = screen.getByTestId('explore-by-ingredient');
    const filter2 = screen.getByTestId('explore-by-nationality');
    const filter3 = screen.getByTestId('explore-surprise');
    const title = screen.getByRole('heading', { name: /explore foods/i });
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(filter1.innerHTML).toBe('By Ingredient');
    expect(filter2.innerHTML).toBe('By Nationality');
    expect(filter3.innerHTML).toBe('Surprise me!');
    expect(profileIcon).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de profile, redireciona para a página de profile',
    () => {
      const { history } = renderWithRouter(<ExploreFood />);
      const profileBtn = screen.getByTestId('profile-top-btn');
      userEvent.click(profileBtn);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });
  it('Teste os filtros', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    const { history } = renderWithRouter(<ExploreFood />);
    const filter1 = screen.getByTestId('explore-by-ingredient');
    const filter2 = screen.getByTestId('explore-by-nationality');
    const filter3 = screen.getByTestId('explore-surprise');
    fireEvent.click(filter1);
    expect(history.location.pathname).toBe('/explore/foods/ingredients');
    renderWithRouter(<ExploreFood />);
    fireEvent.click(filter2);
    expect(history.location.pathname).toBe('/explore/foods/nationalities');
    renderWithRouter(<ExploreFood />);
    fireEvent.click(filter3);
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/random.php');
    // expect(history.location.pathname).toBe(`/foods/${oneMeal.meals[0].idMeal}`);
  });
});
