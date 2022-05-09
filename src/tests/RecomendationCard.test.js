import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente "IngredientCard"', () => {
  it('Testa se é feita o redirecionamento correto com o clique', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52977');
    const img = await screen.findByTestId('0-card-img');
    fireEvent.click(img);
    expect(history.location.pathname).toBe('/drinks/15997');
  });

  it('Testa se é feita o redirecionamento correto com o keyPress', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52977');
    await act(async () => {
      const img = await screen.findByTestId('0-card-img');
      fireEvent.keyDown(img, { key: 'Enter' });
    });
    expect(history.location.pathname).toBe('/drinks/15997');
  });
});
