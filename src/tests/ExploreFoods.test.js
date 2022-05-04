import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExploreFood from '../Pages/ExploreFoods';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente \'ExploreFood\'', () => {
  it('Verifica se o componente \'ExploreFood\' foi renderizado corretamente', () => {
    renderWithRouter(<ExploreFood />);
    const title = screen.getByRole('heading', { name: /explorar comidas/i });
    const title2 = screen.getByRole('heading', { name: /explore foods/i });
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de profile, redireciona para a página de profile',
    () => {
      const { history } = renderWithRouter(<ExploreFood />);
      const profileBtn = screen.getByTestId('profile-top-btn');
      userEvent.click(profileBtn);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });
});
