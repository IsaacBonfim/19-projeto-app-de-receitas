import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoriteRecipe from '../Pages/FavoriteRecipe';

describe('Testa o componente "FavoriteRecipe"', () => {
  it('Verifica se o componente "FavoriteRecipe" foi renderizado corretamente', () => {
    renderWithRouter(<FavoriteRecipe />);
    const title = screen.getByRole('heading', { name: /favorite recipes/i });
    const title2 = screen.getByRole('heading', { name: /Receitas Favoritas/i });
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(title).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de profile, redireciona para a página de profile',
    () => {
      const { history } = renderWithRouter(<FavoriteRecipe />);
      const profileBtn = screen.getByTestId('profile-top-btn');
      userEvent.click(profileBtn);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });
});
