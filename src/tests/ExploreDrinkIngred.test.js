import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import ExploreDrinkIngred from '../Pages/ExploreDrinkIngred';

describe('Testa o componente "ExploreDrinkIngred" ', () => {
  it('Verifica se o componente "ExploreDrinkIngred" foi renderizado corretamente', () => {
    renderWithRouter(<ExploreDrinkIngred />);
    const title = screen.getByRole('heading', { name: /explore ingredients/i });
    expect(title).toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de profile, redireciona para a página de profile',
    () => {
      const { history } = renderWithRouter(<ExploreDrinkIngred />);
      const profileBtn = screen.getByTestId('profile-top-btn');
      userEvent.click(profileBtn);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });
});
