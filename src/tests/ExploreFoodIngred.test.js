import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExploreFoodIngred from '../Pages/ExploreFoodIngred';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente "ExploreFoodIngred"', () => {
  it('Verifica se o componente "ExploreFoodIngred" foi renderizado corretamente', () => {
    renderWithRouter(<ExploreFoodIngred />);
    const title = screen.getByRole('heading', { name: /explore ingredients/i });
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(title).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de profile, redireciona para a página de profile',
    () => {
      const { history } = renderWithRouter(<ExploreFoodIngred />);
      const profileBtn = screen.getByTestId('profile-top-btn');
      userEvent.click(profileBtn);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });
});
