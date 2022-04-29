import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import ExploreDrinks from '../Pages/ExploreDrinks';

describe('Testa o componente ExploreDrinks', () => {
  it('Verifica se o componente ExploreDrinks foi renderizado corretamente', () => {
    renderWithRouter(<ExploreDrinks />);
    const title = screen.getByRole('heading', { name: /explorar bebidas/i });
    const title2 = screen.getByRole('heading', { name: /explore drinks/i });
    expect(title).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de profile, redireciona para a página de profile',
    () => {
      const { history } = renderWithRouter(<ExploreDrinks />);
      const profileBtn = screen.getByRole('img', { name: /profile icon/i });
      userEvent.click(profileBtn);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });
});
