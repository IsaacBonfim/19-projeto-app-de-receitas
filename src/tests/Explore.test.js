import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Explore from '../Pages/Explore';

describe('Testa o componente "Explore" ', () => {
  it('Verifica se o componente "Explore" foi renderizado corretamente', () => {
    renderWithRouter(<Explore />);
    const title1 = screen.getByRole('heading', { name: /explore/i });
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    expect(title1).toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de profile, redireciona para a página de profile',
    () => {
      const { history } = renderWithRouter(<Explore />);
      const profileBtn = screen.getByTestId('profile-top-btn');
      userEvent.click(profileBtn);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });
});
