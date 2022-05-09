import React from 'react';
import { fireEvent, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import renderWithRouter from './renderWithRouter';

const URL = '/drinks/15997';

describe('Testa o componente "DrinkDetails" ', () => {
  it('Verifica se o componente "DrinkDetails" foi renderizado corretamente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(URL);
    const startBtn = await screen.findByRole('button', { name: /start recipe/i });
    fireEvent.click(startBtn);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });
  it('Testa o botão de favorito', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(URL);
    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', whiteHeartIcon);
    await act(async () => {
      userEvent.click(favoriteBtn);
    });
  });
  it('Testa o botão share', () => {
    const writeTextFn = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = writeTextFn;
    const { history } = renderWithRouter(<App />);
    history.push(URL);
    const shareBtn = screen.getByTestId('share-btn');
    fireEvent.click(shareBtn);
    expect(writeTextFn.writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/15997');
  });

  // it('Testa se apos o clique no start o botão muda pra continueRecipe', () => {
  //   const doneRecipes = [{ id: '15997', type: 'drink', nationality: '', category: 'Ordinary Drink', alcoholicOrNot: 'Optional alcohol', name: 'GG', image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg', doneDate: '09/05/2022', tags: [] }];
  //   localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  //   const { history } = renderWithRouter(<App />);
  //   history.push(URL);
  //   const start = screen.getByTestId('start-recipe-btn');
  //   expect(start).not.toBeInTheDocument();
  // });
});
