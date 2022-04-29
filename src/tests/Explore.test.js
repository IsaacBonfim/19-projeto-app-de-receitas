import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Explore from '../Pages/Explore';

describe('Testa o componente "Explore" ', () => {
  it('Verifica se o componente "Explore" foi renderizado corretamente', () => {
    renderWithRouter(<Explore />);
    const title1 = screen.getByRole('heading', { name: /explore/i });
    const title2 = screen.getByRole('heading', { name: /explorar/i });
    const profileIcon = screen.getByRole('img', { name: /profile icon/i });
    expect(profileIcon).toBeInTheDocument();
    expect(title1).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de profile, redireciona para a página de profile',
    () => {
      const { history } = renderWithRouter(<Explore />);
      const profileBtn = screen.getByRole('img', { name: /profile icon/i });
      userEvent.click(profileBtn);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });
});
