import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Profile from '../Pages/Profile';

describe('Testa o componente Profile', () => {
  it('Testa se o componente Profile renderiza corretamente', () => {
    renderWithRouter(<Profile />);
    const profileBtn = screen.getByRole('img', { name: /profile icon/i });
    const profileText = screen.getByRole('heading', { name: /profile/i });
    const principalText = screen.getByRole('heading', { name: /perfil/i });
    expect(principalText).toBeInTheDocument();
    expect(profileText).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
  });
});
