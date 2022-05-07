import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import DoneRecipe from '../Pages/DoneRecipe';

describe('Testa o componente "DoneRecipes" ', () => {
  it('Verifica se o componente "DoneRecipes" foi renderizado corretamente', () => {
    renderWithRouter(<DoneRecipe />);
    const title1 = screen.getByRole('heading', { name: /done recipes/i });
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    expect(title1).toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de profile, redireciona para a página de profile',
    () => {
      const { history } = renderWithRouter(<DoneRecipe />);
      const profileBtn = screen.getByTestId('profile-top-btn');
      userEvent.click(profileBtn);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });
});
