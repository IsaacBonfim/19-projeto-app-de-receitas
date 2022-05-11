import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import oneDrink from '../../cypress/mocks/oneDrink';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente "DrinkProgress" ', () => {
  it('Verifica se o componente "DrinkProgress" foi renderizado corretamente',
    async () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneDrink),
      });
      await act(async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks/17203/in-progress');
      });
      expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17203');
      const option = screen.getAllByRole('checkbox');
      option.forEach((element) => {
        userEvent.click(element);
      });
      const finishBtn = screen.getByTestId('finish-recipe-btn');
      userEvent.click(finishBtn);
    });
});
