import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExploreFoodNational from '../Pages/ExploreFoodNational';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente "ExploreFoodNational"', () => {
  it('Verifica se o componente "ExploreFoodNational" foi renderizado corretamente',
    () => {
      renderWithRouter(<ExploreFoodNational />);
      const title = screen.getByRole('heading', { name: /explore nationalities/i });
      const title2 = screen
        .getByRole('heading', { name: /Explorar Comidas por Nacionalidade/i });
      const profileIcon = screen.getByRole('img', { name: /profile icon/i });
      expect(title).toBeInTheDocument();
      expect(title2).toBeInTheDocument();
      expect(profileIcon).toBeInTheDocument();
    });
  it('Testa se ao clicar no botão de profile, redireciona para a página de profile',
    () => {
      const { history } = renderWithRouter(<ExploreFoodNational />);
      const profileBtn = screen.getByRole('img', { name: /profile icon/i });
      userEvent.click(profileBtn);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });
});
