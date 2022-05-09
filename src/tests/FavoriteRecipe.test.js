import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritesRecipes } from './inputs';
import renderWithRouter from './renderWithRouter';
import FavoriteRecipe from '../Pages/FavoriteRecipe';

function saveLocalStorage() {
  localStorage.setItem('favoriteRecipes', JSON.stringify(FavoritesRecipes));
}

describe('Testa o componente "FavoriteRecipe"', () => {
  afterEach(() => {
    localStorage.clear();
  });

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
  it('Testa se ao clicar é redirecionado corretamente', () => {
    saveLocalStorage();
    const { history } = renderWithRouter(<FavoriteRecipe />);
    const div = screen.getByRole('img', { name: /corba/i });
    const name = screen.getByText(FavoritesRecipes[0].name);
    userEvent.click(div);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/foods/${FavoritesRecipes[0].id}`);
    renderWithRouter(<FavoriteRecipe />);
    fireEvent.keyPress(div, { key: 'Enter', code: 13, charCode: 13 });
    const { location: { pathname: pathname2 } } = history;
    expect(pathname2).toBe(`/foods/${FavoritesRecipes[0].id}`);
    renderWithRouter(<FavoriteRecipe />);
    userEvent.click(name);
    const { location: { pathname: pathname3 } } = history;
    expect(pathname3).toBe(`/foods/${FavoritesRecipes[0].id}`);
    renderWithRouter(<FavoriteRecipe />);
    fireEvent.keyPress(name, { key: 'Enter', code: 13, charCode: 13 });
    const { location: { pathname: pathname4 } } = history;
    expect(pathname4).toBe(`/foods/${FavoritesRecipes[0].id}`);
  });
  it('Testa o se o link vai para a area de tranferencia', () => {
    const writeTextFn = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = writeTextFn;
    saveLocalStorage();
    renderWithRouter(<FavoriteRecipe />);
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareBtn);
    expect(writeTextFn.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52977');
  });

  it('Testa se o botão de favorito, quando clicado, retira a receita da tela', () => {
    const THREE = 3;
    const FOUR = 4;
    saveLocalStorage();
    renderWithRouter(<FavoriteRecipe />);
    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    const doneContainer = document.querySelectorAll('.done-card');
    expect(doneContainer.length).toBe(FOUR);
    userEvent.click(favoriteBtn);
    const doneContainer2 = document.querySelectorAll('.done-card');
    expect(doneContainer2.length).toBe(THREE);
  });
});
