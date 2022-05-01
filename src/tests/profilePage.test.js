import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Profile from '../Pages/Profile';
import { sendLocalStorage } from '../Helpers/localStorage';

describe('Testa o componente Profile', () => {
  it('Testa se o componente Profile renderiza corretamente', () => {
    sendLocalStorage({ email: 'email@email.com' });
    renderWithRouter(<Profile />);
    const profileBtn = screen.getByTestId('profile-top-btn');
    const profileText = screen.getByRole('heading', { name: /profile/i });
    expect(profileText).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
  });
});
