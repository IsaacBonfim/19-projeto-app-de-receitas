import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Profile from '../Pages/Profile';

const EMAIL = 'email@email.com';

describe('Testa o componente Profile', () => {
  it('Testa se o componente Profile renderiza corretamente', () => {
    localStorage.setItem('user', JSON.stringify(EMAIL));
    renderWithRouter(<Profile />);
    const profileBtn = screen.getByTestId('profile-top-btn');
    const profileText = screen.getByRole('heading', { name: /profile/i });
    expect(profileText).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
  });

  it('Testa se o botão de doneRecipes é realizado o redirecionamento', () => {
    localStorage.setItem('user', JSON.stringify('email@email.com'));
    const { history } = renderWithRouter(<Profile />);
    const doneRecipeBtn = screen.getByRole('button', { name: /done recipes/i });
    userEvent.click(doneRecipeBtn);
    expect(doneRecipeBtn).toBeInTheDocument();
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Testa se o botão de favorite recipes é realizado o redirecionamento', () => {
    localStorage.setItem('user', JSON.stringify(EMAIL));
    const { history } = renderWithRouter(<Profile />);
    const favoriteBtn = screen.getByRole('button', { name: /favorite recipes/i });
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toBeInTheDocument();
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Testa se o botão de logout é realizado o redirecionamento', () => {
    localStorage.setItem('user', JSON.stringify(EMAIL));
    const { history } = renderWithRouter(<Profile />);
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    userEvent.click(logoutBtn);
    expect(logoutBtn).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });
});
