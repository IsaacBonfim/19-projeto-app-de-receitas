import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Drink from '../Pages/Drink';
import { drinks } from '../../cypress/mocks/drinks';

describe('Testa o componente RecipeCard', () => {
  it('Testa se o componente é renderizado corretamente', async () => {
    const { history } = renderWithRouter(<Drink />);
    const img = await screen.findByTestId('0-card-img');
    const div = await screen.findByTestId('0-recipe-card');
    expect(img).toHaveAttribute('src', drinks[0].strDrinkThumb);
    userEvent.click(div);
    expect(history.location.pathname).toBe(`/drinks/${drinks[0].idDrink}`);
  });
  it('Testa se o componente é renderizado corretamente', async () => {
    const { history } = renderWithRouter(<Drink />);
    const div = await screen.findByTestId('0-recipe-card');
    fireEvent.keyPress(div, { key: 'Enter', code: 13, charCode: 13 });
    expect(history.location.pathname).toBe(`/drinks/${drinks[0].idDrink}`);
  });
});
