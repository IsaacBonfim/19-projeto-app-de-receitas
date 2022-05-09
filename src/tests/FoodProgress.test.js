import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';

describe('Testa o componente "FoodProgress"', () => {
  it('Verifica se o componente "FoodProgress" foi renderizado corretamente',
    async () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneMeal),
      });
      await act(async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods/52977/in-progress');
      });
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977');
      const option = screen.getAllByRole('checkbox');
      option.forEach((element) => {
        userEvent.click(element);
      });
      const finishBtn = screen.getByTestId('finish-recipe-btn');
      userEvent.click(finishBtn);
    });
});
