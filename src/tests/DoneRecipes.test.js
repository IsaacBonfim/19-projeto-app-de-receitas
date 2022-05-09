import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import DoneRecipe from '../Pages/DoneRecipe';
import { MultipleDoneRecipes, RecipeslocalStorage } from './inputs';

const URL_DRINKS = '/drinks/178319';

function saveLocalStorage() {
  localStorage.setItem('doneRecipes', JSON.stringify([RecipeslocalStorage]));
}

describe('Testa o componente "DoneRecipes" ', () => {
  it('Verifica se o componente "DoneRecipes" foi renderizado corretamente', () => {
    renderWithRouter(<DoneRecipe />);
    const title1 = screen.getByRole('heading', { name: /done recipes/i });
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    expect(title1).toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de profile, redireciona para a página de profile',
    () => {
      const { history } = renderWithRouter(<DoneRecipe />);
      const profileBtn = screen.getByTestId('profile-top-btn');
      userEvent.click(profileBtn);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });
  it('Testa a renderização do componente DoneRecipesCard', async () => {
    saveLocalStorage();
    const { history } = renderWithRouter(<DoneRecipe />);
    const img = screen.getByRole('img', { name: /aquamarine/i });
    const name = screen.getByTestId('0-horizontal-name');
    const date = screen.getByTestId('0-horizontal-done-date');
    expect(name).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(date.innerHTML).toBe('07/05/2022');
    expect(name.innerHTML).toBe('Aquamarine');
    expect(img).toBeInTheDocument();
    userEvent.click(img);
    expect(history.location.pathname).toBe(URL_DRINKS);
    renderWithRouter(<DoneRecipe />);
    fireEvent.keyPress(img, { key: 'Enter', code: 13, charCode: 13 });
    expect(history.location.pathname).toBe(URL_DRINKS);
  });
  it('Testa o copyToClipBoard', () => {
    const writeTextFn = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = writeTextFn;

    saveLocalStorage();
    renderWithRouter(<DoneRecipe />);
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
  it('testa redirecionamento pelo nome ou data, e testa tag', () => {
    const { history } = renderWithRouter(<DoneRecipe />);
    const name = screen.getByTestId('0-horizontal-name');
    const tag = screen.getByTestId('0-arara-horizontal-tag');
    expect(tag).toBeInTheDocument();
    expect(tag.innerHTML).toBe('arara');
    userEvent.click(name);
    expect(history.location.pathname).toBe(URL_DRINKS);
    renderWithRouter(<DoneRecipe />);
    fireEvent.keyPress(name, { key: 'Enter', code: 13, charCode: 13 });
    expect(history.location.pathname).toBe(URL_DRINKS);
  });
  it('Testa os Botoes de filtro', () => {
    const CLASS = '.done-card';
    const FOUR = 4;
    const TWO = 2;
    localStorage.setItem('doneRecipes', JSON.stringify(MultipleDoneRecipes));
    renderWithRouter(<DoneRecipe />);
    const divs = document.querySelectorAll(CLASS);
    expect(divs.length).toBe(FOUR);
    const foodBtn = screen.getByRole('button', { name: /food/i });
    fireEvent.click(foodBtn);
    const foodDivs = document.querySelectorAll(CLASS);
    expect(foodDivs.length).toBe(TWO);
    const drinkBtn = screen.getByRole('button', { name: /drinks/i });
    userEvent.click(drinkBtn);
    const drinksDivs = document.querySelectorAll(CLASS);
    expect(drinksDivs.length).toBe(TWO);
    const allBtn = screen.getByRole('button', { name: /all/i });
    userEvent.click(allBtn);
    const allDivs = document.querySelectorAll(CLASS);
    expect(allDivs.length).toBe(FOUR);
  });
});
