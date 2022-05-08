import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritesRecipes } from './inputs';
import renderWithRouter from './renderWithRouter';
import FavoriteRecipe from '../Pages/FavoriteRecipe';

function saveLocalStorage() {
  localStorage.setItem('favoriteRecipes', JSON.stringify(FavoritesRecipes));
}

describe('Testa o componente "FavoriteRecipe"', () => {
  it('Verifica se o componente "FavoriteRecipe" foi renderizado corretamente', () => {
    renderWithRouter(<FavoriteRecipe />);
    const title = screen.getByRole('heading', { name: /favorite recipes/i });
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(title).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de profile, redireciona para a página de profile',
    () => {
      const { history } = renderWithRouter(<FavoriteRecipe />);
      const profileBtn = screen.getByTestId('profile-top-btn');
      userEvent.click(profileBtn);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });
  it('Testa se as receitas sao renderizadas corretamente', () => {
    saveLocalStorage();
    renderWithRouter(<FavoriteRecipe />);
    FavoritesRecipes.forEach((recipe, index) => {
      if (recipe.type === 'food') {
        const img = screen.getByTestId(`${index}-horizontal-image`);
        const title = screen.getByTestId(`${index}-horizontal-top-text`);
        const name = screen.getByTestId(`${index}-horizontal-name`);
        expect(img.src).toBe(recipe.image);
        expect(title.innerHTML).toBe(`${recipe.nationality} - ${recipe.category}`);
        expect(name.innerHTML).toBe(recipe.name);
      } else {
        const img = screen.getByTestId(`${index}-horizontal-image`);
        const title = screen.getByTestId(`${index}-horizontal-top-text`);
        const name = screen.getByTestId(`${index}-horizontal-name`);
        expect(img.src).toBe(recipe.image);
        expect(title.innerHTML).toBe(recipe.alcoholicOrNot);
        expect(name.innerHTML).toBe(recipe.name);
      }
    });
  });
});
